-- SQL Script to add mileage field to cars table

-- Begin transaction
BEGIN;

-- Check if mileage column already exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'cars' AND column_name = 'mileage'
    ) THEN
        -- Add mileage column to cars table
        ALTER TABLE cars ADD COLUMN mileage INTEGER;
        
        -- Add a comment to the column for documentation
        COMMENT ON COLUMN cars.mileage IS 'Vehicle mileage in kilometers per liter';
        
        RAISE NOTICE 'Added mileage column to cars table';
    ELSE
        RAISE NOTICE 'Mileage column already exists in cars table';
    END IF;
END;
$$;

-- Update existing cars with default mileage values based on car type
UPDATE cars 
SET mileage = 
    CASE 
        WHEN fuel_type = 'Petrol' AND seats <= 5 THEN 
            -- Small petrol cars typically get better mileage
            FLOOR(RANDOM() * (22 - 15) + 15)::INTEGER
        WHEN fuel_type = 'Diesel' AND seats <= 5 THEN 
            -- Small diesel cars typically get good mileage
            FLOOR(RANDOM() * (25 - 18) + 18)::INTEGER
        WHEN fuel_type = 'Petrol' AND seats > 5 THEN 
            -- Larger petrol vehicles get lower mileage
            FLOOR(RANDOM() * (15 - 10) + 10)::INTEGER
        WHEN fuel_type = 'Diesel' AND seats > 5 THEN 
            -- Larger diesel vehicles
            FLOOR(RANDOM() * (18 - 12) + 12)::INTEGER
        WHEN fuel_type = 'Electric' THEN 
            -- Electric vehicles (range in km per charge / 10 to approximate)
            FLOOR(RANDOM() * (40 - 30) + 30)::INTEGER
        WHEN fuel_type = 'Hybrid' THEN 
            -- Hybrid vehicles
            FLOOR(RANDOM() * (28 - 20) + 20)::INTEGER
        ELSE
            -- Default case
            FLOOR(RANDOM() * (20 - 12) + 12)::INTEGER
    END
WHERE mileage IS NULL;

-- Verify the changes
SELECT id, name, fuel_type, seats, mileage FROM cars;

-- Commit the changes
COMMIT;
