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

-- Swift
INSERT INTO cars (
    id, name, slug, brand_id, price_per_day, transmission, fuel_type, seats, luggage,
    description, features, main_image
) VALUES (
    '5aa19751-3a8e-4601-b3b2-1bac3cbb8058',
    'Swift',
    'maruti-swift',
    '6635df8e-67e8-4cbc-8ab0-359f8dc6321c',
    1500,
    'Manual',
    'Petrol',
    5,
    2,
    'The Maruti Swift is a popular hatchback perfect for navigating Goa''s narrow roads with excellent fuel efficiency.',
    ARRAY[
        'Air Conditioning',
        'Power Steering',
        'Power Windows',
        'Central Locking',
        'USB Charging',
        'Bluetooth Audio'
    ],
    '/images/cars/swift.jpg'
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
    main_image = EXCLUDED.main_image;

-- i20
INSERT INTO cars (
    id, name, slug, brand_id, price_per_day, transmission, fuel_type, seats, luggage,
    description, features, main_image
) VALUES (
    '0544effc-6509-42bc-9b01-c419c27fc9b3',
    'i20',
    'hyundai-i20',
    'f20d198a-454d-41cc-88b4-e01f80fc3936',
    1700,
    'Manual',
    'Petrol',
    5,
    3,
    'The Hyundai i20 offers premium features, comfortable interior, and good fuel efficiency for your Goan adventure.',
    ARRAY[
        'Air Conditioning',
        'Power Steering',
        'Power Windows',
        'Central Locking',
        'USB Charging',
        'Bluetooth Audio',
        'Touchscreen Infotainment'
    ],
    '/images/cars/i20.jpg'
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
    main_image = EXCLUDED.main_image;

-- Creta
INSERT INTO cars (
    id, name, slug, brand_id, price_per_day, transmission, fuel_type, seats, luggage,
    description, features, main_image
) VALUES (
    '869578c9-3010-45e0-87fd-8c60b3453234',
    'Creta',
    'hyundai-creta',
    'f20d198a-454d-41cc-88b4-e01f80fc3936',
    2500,
    'Automatic',
    'Diesel',
    5,
    4,
    'The Hyundai Creta is a compact SUV with ample space, perfect for exploring Goa''s beaches and hills with your family.',
    ARRAY[
        'Air Conditioning',
        'Power Steering',
        'Power Windows',
        'Central Locking',
        'USB Charging',
        'Bluetooth Audio',
        'Touchscreen Infotainment',
        'Cruise Control',
        'Reverse Camera'
    ],
    '/images/cars/creta.jpg'
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
    main_image = EXCLUDED.main_image;

-- Fortuner
INSERT INTO cars (
    id, name, slug, brand_id, price_per_day, transmission, fuel_type, seats, luggage,
    description, features, main_image
) VALUES (
    '896d06f0-193f-4bd2-8adb-8a4c7121729c',
    'Fortuner',
    'toyota-fortuner',
    'fc8d3e1f-a974-4a59-9364-0716b6820c35',
    5000,
    'Automatic',
    'Diesel',
    7,
    5,
    'The Toyota Fortuner is a powerful SUV with excellent off-road capabilities, perfect for exploring Goa''s hidden beaches.',
    ARRAY[
        'Air Conditioning',
        'Power Steering',
        'Power Windows',
        'Central Locking',
        'USB Charging',
        'Bluetooth Audio',
        'Touchscreen Infotainment',
        'Cruise Control',
        'Reverse Camera',
        'Leather Seats',
        'Sunroof',
        '4x4 Drive'
    ],
    '/images/cars/fortuner.jpg'
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
    main_image = EXCLUDED.main_image;

-- City
INSERT INTO cars (
    id, name, slug, brand_id, price_per_day, transmission, fuel_type, seats, luggage,
    description, features, main_image
) VALUES (
    'f495bc8d-5bba-41bb-8100-10e5963c86e1',
    'City',
    'honda-city',
    '446e4133-5cc1-49ed-86fa-15ed4d9cd6d1',
    2200,
    'Automatic',
    'Petrol',
    5,
    3,
    'The Honda City offers a perfect blend of comfort, style, and fuel efficiency for your Goan vacation.',
    ARRAY[
        'Air Conditioning',
        'Power Steering',
        'Power Windows',
        'Central Locking',
        'USB Charging',
        'Bluetooth Audio',
        'Touchscreen Infotainment',
        'Cruise Control',
        'Reverse Camera'
    ],
    '/images/cars/city.jpg'
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
    main_image = EXCLUDED.main_image;

-- Thar
INSERT INTO cars (
    id, name, slug, brand_id, price_per_day, transmission, fuel_type, seats, luggage,
    description, features, main_image
) VALUES (
    '71bd4ede-ba0b-416a-9a69-d428966c390b',
    'Thar',
    'mahindra-thar',
    '8b42991e-f3f6-48c9-acc8-cb51c5b4e12d',
    3000,
    'Manual',
    'Diesel',
    4,
    2,
    'The iconic Mahindra Thar is perfect for adventure lovers looking to explore Goa''s off-road trails and beaches.',
    ARRAY[
        'Air Conditioning',
        'Power Steering',
        'Power Windows',
        'Central Locking',
        'USB Charging',
        'Bluetooth Audio',
        'Touchscreen Infotainment',
        '4x4 Drive',
        'All-Terrain Tires'
    ],
    '/images/cars/thar.jpg'
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
    main_image = EXCLUDED.main_image;

-- Innova Crysta
INSERT INTO cars (
    id, name, slug, brand_id, price_per_day, transmission, fuel_type, seats, luggage,
    description, features, main_image
) VALUES (
    '79ee8e65-ab25-41de-ad86-b8549c439d60',
    'Innova Crysta',
    'toyota-innova-crysta',
    'fc8d3e1f-a974-4a59-9364-0716b6820c35',
    2800,
    'Automatic',
    'Diesel',
    7,
    3,
    'The Toyota Innova Crysta is perfect for larger groups and families exploring Goa. Spacious, comfortable, and reliable, it offers a premium travel experience with ample luggage space.',
    ARRAY[
        'Air Conditioning',
        'Power Steering',
        'Central Locking',
        'Power Windows',
        'Music System',
        'Cruise Control',
        'Rear AC Vents'
    ],
    '/images/cars/innovacrysta.jpg'
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
    main_image = EXCLUDED.main_image;

-- Nexon
INSERT INTO cars (
    id, name, slug, brand_id, price_per_day, transmission, fuel_type, seats, luggage,
    description, features, main_image
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
    '/images/cars/nexon.jpg'
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
    main_image = EXCLUDED.main_image;

-- BMW M3
INSERT INTO cars (
    id, name, slug, brand_id, price_per_day, transmission, fuel_type, seats, luggage,
    description, features, main_image
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
    '/images/cars/bmwm3.jpg'
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
    main_image = EXCLUDED.main_image;

-- Jeep Compass
INSERT INTO cars (
    id, name, slug, brand_id, price_per_day, transmission, fuel_type, seats, luggage,
    description, features, main_image
) VALUES (
    '14d152ea-3622-454e-ad68-1b0b2c5b8411',
    'Compass',
    'jeep-compass',
    '82cd12ca-3728-4a3c-bed6-90dcc0995083',
    3000,
    'Automatic',
    'Diesel',
    5,
    3,
    'The Jeep Compass is the perfect blend of comfort and capability. This premium SUV handles Goa''s terrain with ease while offering a refined interior and advanced features.',
    ARRAY[
        'Air Conditioning',
        'Leather Seats',
        'Panoramic Sunroof',
        'Navigation System',
        'Cruise Control',
        'Hill Descent Control',
        'Premium Sound System'
    ],
    '/images/cars/compass.jpg'
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
    main_image = EXCLUDED.main_image; 