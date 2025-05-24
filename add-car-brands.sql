-- SQL Script to add standardized car brands to the database
-- Run this after fixing duplicates with fix-duplicate-brands.sql

-- Begin transaction
BEGIN;

-- Function to insert brand if it doesn't exist
CREATE OR REPLACE FUNCTION insert_brand_if_not_exists(brand_name TEXT, brand_logo TEXT DEFAULT NULL)
RETURNS VOID AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM brands WHERE name = brand_name) THEN
        INSERT INTO brands (name, logo) VALUES (brand_name, brand_logo);
        RAISE NOTICE 'Added brand: %', brand_name;
    ELSE
        RAISE NOTICE 'Brand already exists: %', brand_name;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Insert all brands
SELECT insert_brand_if_not_exists('Tata Motors', 'https://example.com/logos/tata.png');
SELECT insert_brand_if_not_exists('Mahindra & Mahindra', 'https://example.com/logos/mahindra.png');
SELECT insert_brand_if_not_exists('Maruti Suzuki', 'https://example.com/logos/maruti.png');
SELECT insert_brand_if_not_exists('Toyota', 'https://example.com/logos/toyota.png');
SELECT insert_brand_if_not_exists('Honda', 'https://example.com/logos/honda.png');
SELECT insert_brand_if_not_exists('Hyundai', 'https://example.com/logos/hyundai.png');
SELECT insert_brand_if_not_exists('Kia', 'https://example.com/logos/kia.png');
SELECT insert_brand_if_not_exists('Nissan', 'https://example.com/logos/nissan.png');
SELECT insert_brand_if_not_exists('Renault', 'https://example.com/logos/renault.png');
SELECT insert_brand_if_not_exists('Volkswagen', 'https://example.com/logos/volkswagen.png');
SELECT insert_brand_if_not_exists('Skoda', 'https://example.com/logos/skoda.png');
SELECT insert_brand_if_not_exists('BMW', 'https://example.com/logos/bmw.png');
SELECT insert_brand_if_not_exists('Mercedes-Benz', 'https://example.com/logos/mercedes.png');
SELECT insert_brand_if_not_exists('Audi', 'https://example.com/logos/audi.png');
SELECT insert_brand_if_not_exists('Jeep', 'https://example.com/logos/jeep.png');
SELECT insert_brand_if_not_exists('MG (Morris Garages)', 'https://example.com/logos/mg.png');
SELECT insert_brand_if_not_exists('Lexus', 'https://example.com/logos/lexus.png');
SELECT insert_brand_if_not_exists('Citroën', 'https://example.com/logos/citroen.png');
SELECT insert_brand_if_not_exists('Ford', 'https://example.com/logos/ford.png');
SELECT insert_brand_if_not_exists('Jaguar', 'https://example.com/logos/jaguar.png');
SELECT insert_brand_if_not_exists('Land Rover', 'https://example.com/logos/landrover.png');
SELECT insert_brand_if_not_exists('Porsche', 'https://example.com/logos/porsche.png');
SELECT insert_brand_if_not_exists('Fiat', 'https://example.com/logos/fiat.png');
SELECT insert_brand_if_not_exists('Volvo', 'https://example.com/logos/volvo.png');

-- Verify brands were added
SELECT name FROM brands ORDER BY name;

-- Drop the temporary function
DROP FUNCTION IF EXISTS insert_brand_if_not_exists;

-- Commit the changes
COMMIT;
