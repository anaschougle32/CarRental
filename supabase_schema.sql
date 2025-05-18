-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cars table
CREATE TABLE IF NOT EXISTS cars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  brand_id UUID REFERENCES brands(id),
  price_per_day INTEGER NOT NULL,
  transmission TEXT NOT NULL,
  fuel_type TEXT NOT NULL,
  seats INTEGER NOT NULL,
  luggage INTEGER NOT NULL,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  main_image TEXT,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  rating INTEGER NOT NULL,
  comment TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (read-only)
CREATE POLICY "Allow public read access for brands" ON brands
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access for cars" ON cars
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access for testimonials" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access for blogs" ON blogs
  FOR SELECT USING (true);

-- Create policy for allowing contact form submissions
CREATE POLICY "Allow public to insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Insert sample data for brands
INSERT INTO brands (name, logo) VALUES
  ('Hyundai', 'https://example.com/logos/hyundai.png'),
  ('Maruti Suzuki', 'https://example.com/logos/maruti.png'),
  ('Toyota', 'https://example.com/logos/toyota.png'),
  ('Honda', 'https://example.com/logos/honda.png'),
  ('Tata', 'https://example.com/logos/tata.png'),
  ('Mahindra', 'https://example.com/logos/mahindra.png'),
  ('BMW', 'https://example.com/logos/bmw.png'),
  ('Jeep', 'https://example.com/logos/jeep.png')
ON CONFLICT DO NOTHING;

-- Insert sample data for cars
-- Replace with your actual data and image URLs
INSERT INTO cars (name, slug, brand_id, price_per_day, transmission, fuel_type, seats, luggage, description, features, main_image, images)
SELECT 
  'i20',
  'hyundai-i20',
  id,
  1200,
  'Manual',
  'Petrol',
  5,
  2,
  'The Hyundai i20 is a perfect hatchback for exploring Goa''s narrow streets and beaches. Compact, fuel-efficient, and easy to park, this car is ideal for couples or small families.',
  ARRAY['Air Conditioning', 'Power Steering', 'Central Locking', 'Power Windows', 'Music System'],
  'https://picsum.photos/800/600',
  ARRAY['https://picsum.photos/800/600', 'https://picsum.photos/800/601', 'https://picsum.photos/800/602']
FROM brands WHERE name = 'Hyundai'
ON CONFLICT DO NOTHING;

INSERT INTO cars (name, slug, brand_id, price_per_day, transmission, fuel_type, seats, luggage, description, features, main_image, images)
SELECT 
  'Swift',
  'maruti-swift',
  id,
  1100,
  'Manual',
  'Petrol',
  5,
  2,
  'The evergreen Maruti Swift offers unbeatable fuel efficiency and reliability for your Goan adventure. Agile, comfortable, and affordable, it''s a perfect companion for exploring the coastal state.',
  ARRAY['Air Conditioning', 'Power Steering', 'Central Locking', 'Power Windows', 'Music System'],
  'https://picsum.photos/800/603',
  ARRAY['https://picsum.photos/800/603', 'https://picsum.photos/800/604', 'https://picsum.photos/800/605']
FROM brands WHERE name = 'Maruti Suzuki'
ON CONFLICT DO NOTHING;

INSERT INTO cars (name, slug, brand_id, price_per_day, transmission, fuel_type, seats, luggage, description, features, main_image, images)
SELECT 
  'Innova Crysta',
  'toyota-innova-crysta',
  id,
  2800,
  'Automatic',
  'Diesel',
  7,
  3,
  'The Toyota Innova Crysta is perfect for larger groups and families exploring Goa. Spacious, comfortable, and reliable, it offers a premium travel experience with ample luggage space.',
  ARRAY['Air Conditioning', 'Power Steering', 'Central Locking', 'Power Windows', 'Music System', 'Cruise Control', 'Rear AC Vents'],
  'https://picsum.photos/800/606',
  ARRAY['https://picsum.photos/800/606', 'https://picsum.photos/800/607', 'https://picsum.photos/800/608']
FROM brands WHERE name = 'Toyota'
ON CONFLICT DO NOTHING;

INSERT INTO cars (name, slug, brand_id, price_per_day, transmission, fuel_type, seats, luggage, description, features, main_image, images)
SELECT 
  'City',
  'honda-city',
  id,
  1800,
  'Automatic',
  'Petrol',
  5,
  3,
  'The Honda City sedan combines elegance with performance, offering a premium driving experience. Perfect for business travelers or families seeking comfort and style.',
  ARRAY['Air Conditioning', 'Power Steering', 'Central Locking', 'Power Windows', 'Music System', 'Cruise Control', 'Alloy Wheels'],
  'https://picsum.photos/800/609',
  ARRAY['https://picsum.photos/800/609', 'https://picsum.photos/800/610', 'https://picsum.photos/800/611']
FROM brands WHERE name = 'Honda'
ON CONFLICT DO NOTHING;

INSERT INTO cars (name, slug, brand_id, price_per_day, transmission, fuel_type, seats, luggage, description, features, main_image, images)
SELECT 
  'Nexon',
  'tata-nexon',
  id,
  1600,
  'Manual',
  'Petrol',
  5,
  2,
  'The Tata Nexon combines stylish looks with practicality. This compact SUV offers excellent ground clearance for Goa''s varied terrain and a comfortable ride for all passengers.',
  ARRAY['Air Conditioning', 'Power Steering', 'Central Locking', 'Power Windows', 'Music System', 'Airbags', 'Touchscreen Infotainment'],
  'https://picsum.photos/800/612',
  ARRAY['https://picsum.photos/800/612', 'https://picsum.photos/800/613', 'https://picsum.photos/800/614']
FROM brands WHERE name = 'Tata'
ON CONFLICT DO NOTHING;

INSERT INTO cars (name, slug, brand_id, price_per_day, transmission, fuel_type, seats, luggage, description, features, main_image, images)
SELECT 
  'Thar',
  'mahindra-thar',
  id,
  2500,
  'Manual',
  'Diesel',
  4,
  2,
  'The iconic Mahindra Thar is built for adventure in Goa. Perfect for beach trails and off-road experiences, this 4x4 combines ruggedness with modern amenities.',
  ARRAY['Air Conditioning', 'Power Steering', '4x4 Drive', 'Convertible Top', 'All-Terrain Tires', 'Touchscreen Infotainment'],
  'https://picsum.photos/800/615',
  ARRAY['https://picsum.photos/800/615', 'https://picsum.photos/800/616', 'https://picsum.photos/800/617']
FROM brands WHERE name = 'Mahindra'
ON CONFLICT DO NOTHING;

INSERT INTO cars (name, slug, brand_id, price_per_day, transmission, fuel_type, seats, luggage, description, features, main_image, images)
SELECT 
  '3 Series',
  'bmw-3-series',
  id,
  4500,
  'Automatic',
  'Petrol',
  5,
  3,
  'Experience luxury with the BMW 3 Series. This premium sedan offers sophisticated style, dynamic performance, and advanced features for a truly exclusive Goa road trip.',
  ARRAY['Air Conditioning', 'Leather Seats', 'Panoramic Sunroof', 'Premium Sound System', 'Navigation', 'Cruise Control', 'Parking Sensors'],
  'https://picsum.photos/800/618',
  ARRAY['https://picsum.photos/800/618', 'https://picsum.photos/800/619', 'https://picsum.photos/800/620']
FROM brands WHERE name = 'BMW'
ON CONFLICT DO NOTHING;

INSERT INTO cars (name, slug, brand_id, price_per_day, transmission, fuel_type, seats, luggage, description, features, main_image, images)
SELECT 
  'Compass',
  'jeep-compass',
  id,
  3000,
  'Automatic',
  'Diesel',
  5,
  3,
  'The Jeep Compass is the perfect blend of comfort and capability. This premium SUV handles Goa''s terrain with ease while offering a refined interior and advanced features.',
  ARRAY['Air Conditioning', 'Leather Seats', 'Panoramic Sunroof', 'Navigation System', 'Cruise Control', 'Hill Descent Control', 'Premium Sound System'],
  'https://picsum.photos/800/621',
  ARRAY['https://picsum.photos/800/621', 'https://picsum.photos/800/622', 'https://picsum.photos/800/623']
FROM brands WHERE name = 'Jeep'
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (name, location, rating, comment, image)
VALUES
  ('Rahul Sharma', 'Mumbai', 5, 'Fantastic service! The car was in perfect condition, and the process was smooth from booking to return. Will definitely use GoDrive again on my next trip to Goa.', 'https://picsum.photos/100/100'),
  ('Priya Patel', 'Delhi', 4, 'Very good experience with GoDrive. The car was clean and well-maintained. The only reason for not giving 5 stars is that the pickup took a bit longer than expected.', 'https://picsum.photos/100/101'),
  ('Amit Singh', 'Bangalore', 5, 'Excellent service and very reasonable prices. The staff was helpful and professional. The car was perfect for our family trip around Goa.', 'https://picsum.photos/100/102'),
  ('Neha Gupta', 'Pune', 5, 'Best car rental service in Goa! Clean cars, transparent pricing, and great customer service. Highly recommended for anyone visiting Goa.', 'https://picsum.photos/100/103')
ON CONFLICT DO NOTHING;

-- Insert sample blog posts
INSERT INTO blogs (title, slug, excerpt, content, cover_image, author) 
VALUES 
  (
    'Top 10 Beaches to Explore in Goa with Your Rental Car',
    'top-10-beaches-goa-with-rental-car',
    'Discover the most beautiful beaches in Goa that are easily accessible with your rental car.',
    'Goa, the smallest state of India, is home to some of the most beautiful beaches in the world. With your rental car from GoDrive, you can easily explore these coastal gems at your own pace.

## 1. Calangute Beach
Often called the "Queen of Beaches," Calangute is one of the largest and most popular beaches in North Goa. The beach offers a wide range of water sports activities and is lined with restaurants and shops.

## 2. Baga Beach
Adjacent to Calangute, Baga Beach is famous for its nightlife and water sports. Don''t miss the Saturday night market for some shopping and local cuisine.

## 3. Anjuna Beach
Known for its full-moon parties and the famous flea market, Anjuna has a distinctly bohemian vibe. The rocky shoreline creates scenic views, especially at sunset.

## 4. Vagator Beach
Divided into two parts by a headland, Vagator offers stunning views of the Chapora Fort. The beach is less crowded and perfect for those seeking tranquility.

## 5. Morjim Beach
Also known as "Little Russia," Morjim is a nesting ground for the Olive Ridley turtles. The beach has a more laid-back atmosphere and some great seafood restaurants.

## 6. Arambol Beach
Popular among long-stay travelers, Arambol has a bohemian atmosphere with drum circles, yoga classes, and vibrant beach shacks.

## 7. Palolem Beach
Located in South Goa, Palolem is a crescent-shaped beach with calm waters, making it ideal for swimming. The beach is lined with colorful wooden huts during the season.

## 8. Agonda Beach
One of the quietest and most beautiful beaches in South Goa, Agonda is perfect for those seeking peace and solitude. The beach is clean and less commercialized.

## 9. Colva Beach
The longest beach in South Goa, Colva is popular among locals and domestic tourists. The white sandy beach is dotted with coconut palms and beach shacks.

## 10. Benaulim Beach
Just south of Colva, Benaulim is a fishing beach with a more authentic Goan vibe. The beach is clean and less crowded, making it perfect for a peaceful day out.

With your rental car from GoDrive, you can visit all these beaches at your own convenience, allowing you to truly explore the coastal beauty of Goa. Remember to carry your driving essentials, including water, sunscreen, and a map, to make the most of your beach-hopping adventure!',
    'https://picsum.photos/800/400',
    'Deepak Mehta'
  ),
  (
    'A Guide to Goa''s Spice Plantations: Day Trips by Car',
    'goa-spice-plantations-day-trips-by-car',
    'Plan the perfect day trip to Goa''s aromatic spice plantations with our comprehensive driving guide.',
    'Beyond its beaches, Goa is home to lush spice plantations that offer a glimpse into the state''s agricultural heritage. With a rental car from GoDrive, you can easily plan a day trip to these aromatic plantations.

## Why Visit Spice Plantations?

Goa''s spice plantations are a treat for the senses. Walk through paths lined with vanilla, cardamom, cinnamon, and pepper plants. Learn about sustainable farming practices and the historical importance of the spice trade in India.

## Top Spice Plantations to Visit

### 1. Sahakari Spice Farm
Located near Ponda, Sahakari is one of the largest and most popular spice plantations in Goa. Visitors can enjoy guided tours, elephant rides, and a traditional Goan lunch.

**Driving Directions:** From Panaji, take the NH4A towards Ponda. The farm is approximately 30 km from the capital city and well-marked with signs.

### 2. Tropical Spice Plantation
This plantation near Ponda offers an immersive experience with guided tours, butterfly gardens, and bird watching. Don''t miss their traditional Goan cuisine served on banana leaves.

**Driving Directions:** Located in Keri Village, about 7 km from Ponda. Follow the signs from the main road.

### 3. Pascoal Spice Village
A lesser-known gem, Pascoal offers a more intimate experience with smaller crowds. The guides here are particularly knowledgeable about medicinal uses of spices.

**Driving Directions:** Located near Khandepar, about 10 km from Ponda town.

## Planning Your Drive

The best time to visit the spice plantations is during the monsoon season (June to September) when the plantations are lush and vibrant. However, be cautious of slippery roads during heavy rains.

Most plantations are clustered around the Ponda region, making it easy to visit multiple plantations in a single day. Start early, around 9 AM, to make the most of your trip.

## What to Pack

- Comfortable walking shoes
- Insect repellent
- Camera
- Cash (some plantations don''t accept cards)
- Light rain jacket during monsoon

With your GoDrive rental car, you have the flexibility to explore these hidden treasures of Goa at your own pace. The drive through the Western Ghats to reach the plantations is an experience in itself, with stunning views of the countryside. Happy exploring!',
    'https://picsum.photos/800/401',
    'Ananya Desai'
  )
ON CONFLICT DO NOTHING; 