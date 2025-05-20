-- First, ensure the brands exist
INSERT INTO brands (id, name, logo) VALUES
('fc8d3e1f-a974-4a59-9364-0716b6820c35', 'Toyota', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1024px-Toyota_carlogo.svg.png'),
('f20d198a-454d-41cc-88b4-e01f80fc3936', 'Hyundai', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Hyundai_Motor_Company_logo.svg/2560px-Hyundai_Motor_Company_logo.svg.png'),
('6635df8e-67e8-4cbc-8ab0-359f8dc6321c', 'Maruti Suzuki', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Maruti_Suzuki_Logo.svg/2560px-Maruti_Suzuki_Logo.svg.png'),
('446e4133-5cc1-49ed-86fa-15ed4d9cd6d1', 'Honda', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda.svg/2560px-Honda.svg.png'),
('8b42991e-f3f6-48c9-acc8-cb51c5b4e12d', 'Mahindra', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Mahindra_Rise_Logo.svg/2560px-Mahindra_Rise_Logo.svg.png'),
('69ac2e11-6baa-4fd8-a80a-b8b60a419725', 'Tata', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Tata_logo.svg/2560px-Tata_logo.svg.png'),
('e1e11a2b-3058-4395-b001-1005839a5123', 'BMW', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png'),
('82cd12ca-3728-4a3c-bed6-90dcc0995083', 'Jeep', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Jeep_logo.svg/2560px-Jeep_logo.svg.png')
ON CONFLICT (id) DO NOTHING;

-- Template for inserting cars
-- Copy and modify this template for each new car
INSERT INTO cars (
    id,
    name,
    slug,
    brand_id,
    price_per_day,
    transmission,
    fuel_type,
    seats,
    luggage,
    description,
    features,
    main_image,
    images
) VALUES (
    '79ee8e65-ab25-41de-ad86-b8549c439d60', -- id (UUID)
    'Innova Crysta', -- name
    'toyota-innova-crysta', -- slug
    'fc8d3e1f-a974-4a59-9364-0716b6820c35', -- brand_id (Toyota)
    2800, -- price_per_day
    'Automatic', -- transmission
    'Diesel', -- fuel_type
    7, -- seats
    3, -- luggage
    'The Toyota Innova Crysta is perfect for larger groups and families exploring Goa. Spacious, comfortable, and reliable, it offers a premium travel experience with ample luggage space.', -- description
    ARRAY[ -- features
        'Air Conditioning',
        'Power Steering',
        'Central Locking',
        'Power Windows',
        'Music System',
        'Cruise Control',
        'Rear AC Vents'
    ],
    '/images/cars/innovacrysta.jpg', -- main_image
    ARRAY[ -- images (using same image for both main and gallery)
        '/images/cars/innovacrysta.jpg'
    ]
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    slug = EXCLUDED.slug,
    brand_id = EXCLUDED.brand_id,
    price_per_day = EXCLUDED.price_per_day,
    transmission = EXCLUDED.transmission,
    fuel_type = EXCLUDED.fuel_type,
    seats = EXCLUDED.seats,
    luggage = EXCLUDED.luggage,
    description = EXCLUDED.description,
    features = EXCLUDED.features,
    main_image = EXCLUDED.main_image,
    images = EXCLUDED.images;

-- Example of how to insert another car (Nexon)
INSERT INTO cars (
    id,
    name,
    slug,
    brand_id,
    price_per_day,
    transmission,
    fuel_type,
    seats,
    luggage,
    description,
    features,
    main_image,
    images
) VALUES (
    'ceac322c-972d-4bf1-877c-7046a40e05db',
    'Nexon',
    'tata-nexon',
    '69ac2e11-6baa-4fd8-a80a-b8b60a419725',
    1600,
    'Manual',
    'Petrol',
    5,
    2,
    'The Tata Nexon combines stylish looks with practicality. This compact SUV offers excellent ground clearance for Goa''s varied terrain and a comfortable ride for all passengers.',
    ARRAY[
        'Air Conditioning',
        'Power Steering',
        'Central Locking',
        'Power Windows',
        'Music System',
        'Airbags',
        'Touchscreen Infotainment'
    ],
    '/images/cars/nexon.jpg',
    ARRAY[
        '/images/cars/nexon.jpg'
    ]
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    slug = EXCLUDED.slug,
    brand_id = EXCLUDED.brand_id,
    price_per_day = EXCLUDED.price_per_day,
    transmission = EXCLUDED.transmission,
    fuel_type = EXCLUDED.fuel_type,
    seats = EXCLUDED.seats,
    luggage = EXCLUDED.luggage,
    description = EXCLUDED.description,
    features = EXCLUDED.features,
    main_image = EXCLUDED.main_image,
    images = EXCLUDED.images;

-- Example for BMW M3
INSERT INTO cars (
    id,
    name,
    slug,
    brand_id,
    price_per_day,
    transmission,
    fuel_type,
    seats,
    luggage,
    description,
    features,
    main_image,
    images
) VALUES (
    '50cdbbf0-b6be-46e1-b3c2-f5dcd36066d1',
    'BMW M3',
    'bmw-m3',
    'e1e11a2b-3058-4395-b001-1005839a5123',
    4500,
    'Automatic',
    'Petrol',
    5,
    3,
    'Experience luxury with the BMW M3. This premium sedan offers sophisticated style, dynamic performance, and advanced features for a truly exclusive Goa road trip.',
    ARRAY[
        'Air Conditioning',
        'Leather Seats',
        'Panoramic Sunroof',
        'Premium Sound System',
        'Navigation',
        'Cruise Control',
        'Parking Sensors'
    ],
    '/images/cars/bmwm3.jpg',
    ARRAY[
        '/images/cars/bmwm3.jpg'
    ]
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    slug = EXCLUDED.slug,
    brand_id = EXCLUDED.brand_id,
    price_per_day = EXCLUDED.price_per_day,
    transmission = EXCLUDED.transmission,
    fuel_type = EXCLUDED.fuel_type,
    seats = EXCLUDED.seats,
    luggage = EXCLUDED.luggage,
    description = EXCLUDED.description,
    features = EXCLUDED.features,
    main_image = EXCLUDED.main_image,
    images = EXCLUDED.images; 