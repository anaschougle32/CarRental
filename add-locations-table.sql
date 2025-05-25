-- SQL Script to add locations table to the database

-- Begin transaction
BEGIN;

-- Create locations table if it doesn't exist
CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    headline VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comment to the table
COMMENT ON TABLE locations IS 'Car rental service locations';

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS locations_slug_idx ON locations(slug);

-- Commit the changes
COMMIT;
