-- Insert cars from user's provided list
-- This query adds cars that are not already in the database

-- First, let's add any missing cars from the user's list
INSERT INTO cars (id, name, slug, brand_id, price_per_day, transmission, fuel_type, seats, luggage, description, features, main_image, images, mileage, created_at)
VALUES
-- Cars that appear to be missing or need to be added based on the user's list
-- Note: Some cars like BMW M3, Compass, Nexon, Innova Crysta, Thar, Fortuner, City, Swift Dezire, i20 already exist

-- Adding cars that might be missing from the comprehensive list:

-- Economy Cars
(gen_random_uuid(), 'WagonR', 'wagonr', '6635df8e-67e8-4cbc-8ab0-359f8dc6321c', 1200, 'Manual', 'Petrol', 5, 2, 'The Maruti WagonR is perfect for city driving in Goa. Compact, fuel-efficient, and easy to park, it''s ideal for couples or small families exploring the coastal roads.', ARRAY['Air Conditioning', 'Power Steering', 'Central Locking', 'Power Windows', 'Music System'], '/images/cars/wagonr.jpg', ARRAY['/images/cars/wagonr.jpg'], 22, NOW()),

(gen_random_uuid(), 'Swift', 'swift', '6635df8e-67e8-4cbc-8ab0-359f8dc6321c', 1400, 'Manual', 'Petrol', 5, 2, 'The Maruti Swift is a popular hatchback perfect for navigating Goa''s narrow roads with excellent fuel efficiency and peppy performance.', ARRAY['Air Conditioning', 'Power Steering', 'Power Windows', 'Central Locking', 'USB Charging', 'Bluetooth Audio'], '/images/cars/swift.jpg', ARRAY['/images/cars/swift.jpg'], 21, NOW()),

(gen_random_uuid(), 'Grand i10', 'grand-i10', 'f20d198a-454d-41cc-88b4-e01f80fc3936', 1300, 'Manual', 'Petrol', 5, 2, 'The Hyundai Grand i10 offers a perfect blend of style, comfort, and fuel efficiency for your Goan vacation. Spacious interior with modern features.', ARRAY['Air Conditioning', 'Power Steering', 'Central Locking', 'Power Windows', 'USB Charging', 'Bluetooth Audio'], '/images/cars/grand-i10.jpg', ARRAY['/images/cars/grand-i10.jpg'], 20, NOW()),

(gen_random_uuid(), 'Baleno', 'baleno', '6635df8e-67e8-4cbc-8ab0-359f8dc6321c', 1600, 'Manual', 'Petrol', 5, 3, 'The Maruti Baleno is a premium hatchback with spacious interiors, advanced features, and excellent fuel economy for comfortable Goa touring.', ARRAY['Air Conditioning', 'Power Steering', 'Central Locking', 'Power Windows', 'Touchscreen Infotainment', 'Reverse Camera'], '/images/cars/baleno.jpg', ARRAY['/images/cars/baleno.jpg'], 23, NOW()),

(gen_random_uuid(), 'i10', 'i10', 'f20d198a-454d-41cc-88b4-e01f80fc3936', 1250, 'Manual', 'Petrol', 5, 2, 'The Hyundai i10 is a compact and efficient car perfect for city drives and short trips around Goa. Easy to drive and park.', ARRAY['Air Conditioning', 'Power Steering', 'Central Locking', 'Power Windows', 'Music System'], '/images/cars/i10.jpg', ARRAY['/images/cars/i10.jpg'], 20, NOW()),

(gen_random_uuid(), 'Ignis', 'ignis', '6635df8e-67e8-4cbc-8ab0-359f8dc6321c', 1500, 'Manual', 'Petrol', 5, 2, 'The Maruti Ignis stands out with its unique design and urban-friendly dimensions. Perfect for exploring Goa''s streets with style and efficiency.', ARRAY['Air Conditioning', 'Power Steering', 'Central Locking', 'Power Windows', 'Touchscreen Infotainment', 'Reverse Camera'], '/images/cars/ignis.jpg', ARRAY['/images/cars/ignis.jpg'], 20, NOW()),

-- Automatic Variants
(gen_random_uuid(), 'i20 Automatic', 'i20-automatic', 'f20d198a-454d-41cc-88b4-e01f80fc3936', 2000, 'Automatic', 'Petrol', 5, 2, 'The Hyundai i20 Automatic offers premium features with the convenience of automatic transmission for a comfortable Goan adventure.', ARRAY['Air Conditioning', 'Power Steering', 'Central Locking', 'USB Charging', 'Bluetooth Audio', 'Touchscreen Infotainment', 'Automatic Climate Control'], '/images/cars/i20-auto.jpg', ARRAY['/images/cars/i20-auto.jpg'], 18, NOW()),

(gen_random_uuid(), 'Baleno Automatic', 'baleno-automatic', '6635df8e-67e8-4cbc-8ab0-359f8dc6321c', 1900, 'Automatic', 'Petrol', 5, 3, 'The Maruti Baleno Automatic combines premium features with automatic convenience, perfect for stress-free driving in Goa.', ARRAY['Air Conditioning', 'Power Steering', 'Central Locking', 'Power Windows', 'Touchscreen Infotainment', 'Reverse Camera', 'Automatic Climate Control'], '/images/cars/baleno-auto.jpg', ARRAY['/images/cars/baleno-auto.jpg'], 21, NOW()),

(gen_random_uuid(), 'Swift Automatic', 'swift-automatic', '6635df8e-67e8-4cbc-8ab0-359f8dc6321c', 1700, 'Automatic', 'Petrol', 5, 2, 'The Maruti Swift Automatic offers the perfect blend of sportiness and convenience with automatic transmission for easy city driving.', ARRAY['Air Conditioning', 'Power Steering', 'Power Windows', 'Central Locking', 'USB Charging', 'Bluetooth Audio', 'Touchscreen Infotainment'], '/images/cars/swift-auto.jpg', ARRAY['/images/cars/swift-auto.jpg'], 19, NOW()),

-- SUVs and MPVs
(gen_random_uuid(), 'Innova (Old)', 'innova-old', 'fc8d3e1f-a974-4a59-9364-0716b6820c35', 2500, 'Manual', 'Diesel', 7, 3, 'The Toyota Innova (Old) is a reliable and spacious MPV perfect for larger groups exploring Goa. Known for its durability and comfort.', ARRAY['Air Conditioning', 'Power Steering', 'Central Locking', 'Power Windows', 'Music System', 'Rear AC Vents'], '/images/cars/innova-old.jpg', ARRAY['/images/cars/innova-old.jpg'], 11, NOW()),

(gen_random_uuid(), 'Ertiga', 'ertiga', '6635df8e-67e8-4cbc-8ab0-359f8dc6321c', 2200, 'Manual', 'Petrol', 7, 3, 'The Maruti Ertiga is a compact MPV offering excellent space utilization and fuel efficiency, perfect for family trips in Goa.', ARRAY['Air Conditioning', 'Power Steering', 'Central Locking', 'Power Windows', 'Touchscreen Infotainment', 'Rear AC Vents'], '/images/cars/ertiga.jpg', ARRAY['/images/cars/ertiga.jpg'], 19, NOW()),

(gen_random_uuid(), 'Brezza', 'brezza', '6635df8e-67e8-4cbc-8ab0-359f8dc6321c', 1800, 'Manual', 'Petrol', 5, 3, 'The Maruti Brezza is a compact SUV with good ground clearance and modern features, ideal for exploring Goa''s diverse terrain.', ARRAY['Air Conditioning', 'Power Steering', 'Central Locking', 'Power Windows', 'Touchscreen Infotainment', 'Reverse Camera', 'Cruise Control'], '/images/cars/brezza.jpg', ARRAY['/images/cars/brezza.jpg'], 17, NOW()),

(gen_random_uuid(), 'Venue', 'venue', 'f20d198a-454d-41cc-88b4-e01f80fc3936', 1900, 'Manual', 'Petrol', 5, 2, 'The Hyundai Venue is a feature-rich compact SUV with connected car technology, perfect for tech-savvy travelers exploring Goa.', ARRAY['Air Conditioning', 'Power Steering', 'Central Locking', 'Power Windows', 'Touchscreen Infotainment', 'Reverse Camera', 'Connected Car Features'], '/images/cars/venue.jpg', ARRAY['/images/cars/venue.jpg'], 18, NOW()),

(gen_random_uuid(), 'Creta', 'creta', 'f20d198a-454d-41cc-88b4-e01f80fc3936', 2500, 'Automatic', 'Petrol', 5, 3, 'The Hyundai Creta is a premium compact SUV offering excellent comfort, features, and performance for a luxurious Goan experience.', ARRAY['Air Conditioning', 'Leather Seats', 'Sunroof', 'Touchscreen Infotainment', 'Reverse Camera', 'Cruise Control', 'Wireless Charging'], '/images/cars/creta.jpg', ARRAY['/images/cars/creta.jpg'], 16, NOW()),

(gen_random_uuid(), 'Alcazar', 'alcazar', 'f20d198a-454d-41cc-88b4-e01f80fc3936', 3200, 'Automatic', 'Petrol', 7, 3, 'The Hyundai Alcazar is a 7-seater SUV with premium features and spacious interiors, perfect for larger groups exploring Goa.', ARRAY['Air Conditioning', 'Leather Seats', 'Sunroof', 'Touchscreen Infotainment', 'Reverse Camera', 'Cruise Control', 'Wireless Charging', 'Rear AC Vents'], '/images/cars/alcazar.jpg', ARRAY['/images/cars/alcazar.jpg'], 14, NOW()),

(gen_random_uuid(), 'Carens', 'carens', 'f13c65e1-2569-4818-a3a5-7bf26dc57b8e', 2800, 'Automatic', 'Petrol', 7, 3, 'The Kia Carens is a stylish 7-seater MPV with premium features and excellent comfort for family trips in Goa.', ARRAY['Air Conditioning', 'Leather Seats', 'Touchscreen Infotainment', 'Reverse Camera', 'Cruise Control', 'Rear AC Vents', 'Connected Car Features'], '/images/cars/carens.jpg', ARRAY['/images/cars/carens.jpg'], 15, NOW()),

(gen_random_uuid(), 'Endeavour', 'endeavour', '079523ce-1977-4925-80c3-0b008a57f87c', 4500, 'Automatic', 'Diesel', 7, 5, 'The Ford Endeavour is a powerful full-size SUV with excellent off-road capabilities and luxury features for premium Goa exploration.', ARRAY['Air Conditioning', 'Leather Seats', 'Sunroof', 'Touchscreen Infotainment', 'Reverse Camera', 'Cruise Control', '4x4 Drive', 'Hill Descent Control'], '/images/cars/endeavour.jpg', ARRAY['/images/cars/endeavour.jpg'], 12, NOW()),

(gen_random_uuid(), 'Hycross', 'hycross', 'fc8d3e1f-a974-4a59-9364-0716b6820c35', 3500, 'Automatic', 'Hybrid', 7, 3, 'The Toyota Hycross is a premium hybrid MPV offering excellent fuel efficiency and modern features for eco-conscious travelers.', ARRAY['Air Conditioning', 'Leather Seats', 'Sunroof', 'Touchscreen Infotainment', 'Reverse Camera', 'Cruise Control', 'Hybrid Technology', 'Rear AC Vents'], '/images/cars/hycross.jpg', ARRAY['/images/cars/hycross.jpg'], 28, NOW()),

-- Luxury Cars
(gen_random_uuid(), 'Audi A4', 'audi-a4', 'dbfe0a56-ef4c-44c4-9358-113e35ca57fb', 6000, 'Automatic', 'Petrol', 5, 3, 'The Audi A4 is a luxury sedan offering premium German engineering, sophisticated design, and advanced technology for an exclusive Goan experience.', ARRAY['Air Conditioning', 'Leather Seats', 'Sunroof', 'Premium Sound System', 'Navigation', 'Cruise Control', 'Parking Sensors', 'Ambient Lighting'], '/images/cars/audi-a4.jpg', ARRAY['/images/cars/audi-a4.jpg'], 15, NOW()),

(gen_random_uuid(), 'Mercedes C-Class', 'mercedes-c-class', '5b274c26-d2a3-47fa-a324-6317ca95a243', 7000, 'Automatic', 'Petrol', 5, 3, 'The Mercedes C-Class epitomizes luxury and comfort with cutting-edge technology and premium materials for the ultimate Goan road trip.', ARRAY['Air Conditioning', 'Leather Seats', 'Panoramic Sunroof', 'Premium Sound System', 'Navigation', 'Cruise Control', 'Parking Sensors', 'Ambient Lighting', 'Massage Seats'], '/images/cars/mercedes-c-class.jpg', ARRAY['/images/cars/mercedes-c-class.jpg'], 14, NOW()),

(gen_random_uuid(), 'BMW 3 Series', 'bmw-3-series', 'e1e11a2b-3058-4395-b001-1005839a5123', 6500, 'Automatic', 'Petrol', 5, 3, 'The BMW 3 Series delivers the perfect balance of luxury, performance, and technology for discerning travelers exploring Goa in style.', ARRAY['Air Conditioning', 'Leather Seats', 'Sunroof', 'Premium Sound System', 'Navigation', 'Cruise Control', 'Parking Sensors', 'Sport Mode'], '/images/cars/bmw-3-series.jpg', ARRAY['/images/cars/bmw-3-series.jpg'], 16, NOW()),

(gen_random_uuid(), 'Mini Cooper', 'mini-cooper', 'e1e11a2b-3058-4395-b001-1005839a5123', 4000, 'Automatic', 'Petrol', 4, 2, 'The Mini Cooper offers a unique blend of iconic British style, fun driving dynamics, and premium features for a distinctive Goan adventure.', ARRAY['Air Conditioning', 'Leather Seats', 'Sunroof', 'Premium Sound System', 'Navigation', 'Cruise Control', 'LED Headlights', 'Sport Mode'], '/images/cars/mini-cooper.jpg', ARRAY['/images/cars/mini-cooper.jpg'], 18, NOW());

-- Note: This query adds cars that appear to be missing from your current database
-- Some cars like BMW M3, Compass, Nexon, Innova Crysta, Thar, Fortuner, City, Swift Dezire, i20 already exist in your database
-- If you want to update existing cars instead, use UPDATE statements with the specific car IDs 