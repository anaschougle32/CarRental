-- SQL Script to fix duplicate brands in the brands table
-- This version is safe for foreign key constraints

-- Begin transaction
BEGIN;

-- First, let's identify duplicates
SELECT name, COUNT(*) 
FROM brands 
GROUP BY name 
HAVING COUNT(*) > 1;

-- For each duplicate brand name, keep only one record and update references
DO $$
DECLARE
    brand_rec RECORD;
    keep_id UUID;
    duplicate_ids UUID[];
BEGIN
    -- Loop through each brand name that has duplicates
    FOR brand_rec IN (
        SELECT name
        FROM brands
        GROUP BY name
        HAVING COUNT(*) > 1
    ) LOOP
        -- Get the ID we want to keep (the first one)
        SELECT id INTO keep_id
        FROM brands
        WHERE name = brand_rec.name
        ORDER BY created_at
        LIMIT 1;
        
        -- Get the IDs we want to remove
        SELECT array_agg(id) INTO duplicate_ids
        FROM brands
        WHERE name = brand_rec.name
        AND id <> keep_id;
        
        -- Update any cars that reference the duplicate IDs to use the kept ID
        EXECUTE 'UPDATE cars SET brand_id = $1 WHERE brand_id = ANY($2)'
        USING keep_id, duplicate_ids;
        
        -- Now it's safe to delete the duplicates
        EXECUTE 'DELETE FROM brands WHERE id = ANY($1)'
        USING duplicate_ids;
        
        RAISE NOTICE 'Fixed duplicates for brand: %, kept ID: %, removed IDs: %', 
                     brand_rec.name, keep_id, duplicate_ids;
    END LOOP;
END;
$$;

-- Add a unique constraint to prevent future duplicates
-- First check if it already exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'unique_brand_name' AND conrelid = 'brands'::regclass
    ) THEN
        ALTER TABLE brands ADD CONSTRAINT unique_brand_name UNIQUE (name);
    END IF;
END;
$$;

-- Verify the results
SELECT name, COUNT(*) 
FROM brands 
GROUP BY name 
HAVING COUNT(*) > 1;

-- Commit the changes
COMMIT;
