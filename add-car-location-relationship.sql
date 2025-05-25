-- SQL Script to add car-location relationship to the database

-- Begin transaction
BEGIN;

-- Create car_locations junction table for many-to-many relationship
CREATE TABLE IF NOT EXISTS car_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(car_id, location_id)
);

-- Add comment to the table
COMMENT ON TABLE car_locations IS 'Junction table for cars available at specific locations';

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS car_locations_car_id_idx ON car_locations(car_id);
CREATE INDEX IF NOT EXISTS car_locations_location_id_idx ON car_locations(location_id);

-- Add some sample data (adjust IDs as needed for your database)
-- This will need to be updated with actual IDs from your database
-- INSERT INTO car_locations (car_id, location_id)
-- SELECT c.id, l.id
-- FROM cars c, locations l
-- WHERE c.id = 'your-car-id' AND l.id = 'your-location-id';

-- Commit the changes
COMMIT;
