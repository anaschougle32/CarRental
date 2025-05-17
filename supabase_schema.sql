-- Create Brands Table
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Cars Table
CREATE TABLE IF NOT EXISTS cars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  brand_id UUID REFERENCES brands(id),
  price_per_day INTEGER NOT NULL,
  transmission TEXT NOT NULL CHECK (transmission IN ('Manual', 'Automatic')),
  fuel_type TEXT NOT NULL CHECK (fuel_type IN ('Petrol', 'Diesel', 'Electric', 'Hybrid')),
  seats INTEGER NOT NULL,
  luggage INTEGER NOT NULL,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  main_image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS cars_brand_id_idx ON cars(brand_id);
CREATE INDEX IF NOT EXISTS cars_transmission_idx ON cars(transmission);
CREATE INDEX IF NOT EXISTS cars_fuel_type_idx ON cars(fuel_type);
CREATE INDEX IF NOT EXISTS cars_seats_idx ON cars(seats);
CREATE INDEX IF NOT EXISTS cars_price_per_day_idx ON cars(price_per_day);

-- Insert sample data for Brands
INSERT INTO brands (name, logo) VALUES
('Honda', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda.svg/2560px-Honda.svg.png'),
('Toyota', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1024px-Toyota_carlogo.svg.png'),
('Maruti Suzuki', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Maruti_Suzuki_Logo.svg/2560px-Maruti_Suzuki_Logo.svg.png'),
('Hyundai', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Hyundai_Motor_Company_logo.svg/2560px-Hyundai_Motor_Company_logo.svg.png'),
('Mahindra', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Mahindra_Rise_Logo.svg/2560px-Mahindra_Rise_Logo.svg.png');

-- Insert sample data for Cars
INSERT INTO cars (name, slug, brand_id, price_per_day, transmission, fuel_type, seats, luggage, description, features, main_image, images) VALUES
(
  'Swift', 
  'maruti-swift', 
  (SELECT id FROM brands WHERE name = 'Maruti Suzuki'), 
  1500, 
  'Manual', 
  'Petrol', 
  5, 
  2, 
  'The Maruti Swift is a popular hatchback perfect for navigating Goa''s narrow roads with excellent fuel efficiency.', 
  ARRAY['Air Conditioning', 'Power Steering', 'Power Windows', 'Central Locking', 'USB Charging', 'Bluetooth Audio'],
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/130591/swift-exterior-right-front-three-quarter-2.jpeg',
  ARRAY['https://imgd.aeplcdn.com/664x374/n/cw/ec/130591/swift-exterior-right-front-three-quarter-3.jpeg', 'https://imgd.aeplcdn.com/664x374/n/cw/ec/130591/swift-exterior-right-rear-three-quarter.jpeg', 'https://imgd.aeplcdn.com/664x374/n/cw/ec/130591/swift-interior-dashboard-3.jpeg']
),
(
  'i20', 
  'hyundai-i20', 
  (SELECT id FROM brands WHERE name = 'Hyundai'), 
  1700, 
  'Manual', 
  'Petrol', 
  5, 
  3, 
  'The Hyundai i20 offers premium features, comfortable interior, and good fuel efficiency for your Goan adventure.', 
  ARRAY['Air Conditioning', 'Power Steering', 'Power Windows', 'Central Locking', 'USB Charging', 'Bluetooth Audio', 'Touchscreen Infotainment'],
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/41406/i20-exterior-right-front-three-quarter-2.jpeg',
  ARRAY['https://imgd.aeplcdn.com/664x374/n/cw/ec/41406/i20-exterior-right-side-view.jpeg', 'https://imgd.aeplcdn.com/664x374/n/cw/ec/41406/i20-exterior-right-rear-three-quarter.jpeg', 'https://imgd.aeplcdn.com/664x374/n/cw/ec/41406/i20-interior-dashboard.jpeg']
),
(
  'Creta', 
  'hyundai-creta', 
  (SELECT id FROM brands WHERE name = 'Hyundai'), 
  2500, 
  'Automatic', 
  'Diesel', 
  5, 
  4, 
  'The Hyundai Creta is a compact SUV with ample space, perfect for exploring Goa''s beaches and hills with your family.', 
  ARRAY['Air Conditioning', 'Power Steering', 'Power Windows', 'Central Locking', 'USB Charging', 'Bluetooth Audio', 'Touchscreen Infotainment', 'Cruise Control', 'Reverse Camera'],
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/creta-exterior-right-front-three-quarter-2.jpeg',
  ARRAY['https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/creta-exterior-right-rear-three-quarter.jpeg', 'https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/creta-exterior-right-side-view.jpeg', 'https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/creta-interior-dashboard.jpeg']
),
(
  'Fortuner', 
  'toyota-fortuner', 
  (SELECT id FROM brands WHERE name = 'Toyota'), 
  5000, 
  'Automatic', 
  'Diesel', 
  7, 
  5, 
  'The Toyota Fortuner is a powerful SUV with excellent off-road capabilities, perfect for exploring Goa''s hidden beaches.', 
  ARRAY['Air Conditioning', 'Power Steering', 'Power Windows', 'Central Locking', 'USB Charging', 'Bluetooth Audio', 'Touchscreen Infotainment', 'Cruise Control', 'Reverse Camera', 'Leather Seats', 'Sunroof', '4x4 Drive'],
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/44709/fortuner-exterior-right-front-three-quarter-19.jpeg',
  ARRAY['https://imgd.aeplcdn.com/664x374/n/cw/ec/44709/fortuner-exterior-right-rear-three-quarter-18.jpeg', 'https://imgd.aeplcdn.com/664x374/n/cw/ec/44709/fortuner-exterior-right-side-view-2.jpeg', 'https://imgd.aeplcdn.com/664x374/n/cw/ec/44709/fortuner-interior-dashboard-22.jpeg']
),
(
  'City', 
  'honda-city', 
  (SELECT id FROM brands WHERE name = 'Honda'), 
  2200, 
  'Automatic', 
  'Petrol', 
  5, 
  3, 
  'The Honda City offers a perfect blend of comfort, style, and fuel efficiency for your Goan vacation.', 
  ARRAY['Air Conditioning', 'Power Steering', 'Power Windows', 'Central Locking', 'USB Charging', 'Bluetooth Audio', 'Touchscreen Infotainment', 'Cruise Control', 'Reverse Camera'],
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/134287/city-exterior-right-front-three-quarter-2.jpeg',
  ARRAY['https://imgd.aeplcdn.com/664x374/n/cw/ec/134287/city-exterior-right-rear-three-quarter.jpeg', 'https://imgd.aeplcdn.com/664x374/n/cw/ec/134287/city-exterior-right-side-view.jpeg', 'https://imgd.aeplcdn.com/664x374/n/cw/ec/134287/city-interior-dashboard.jpeg']
),
(
  'Thar', 
  'mahindra-thar', 
  (SELECT id FROM brands WHERE name = 'Mahindra'), 
  3000, 
  'Manual', 
  'Diesel', 
  4, 
  2, 
  'The iconic Mahindra Thar is perfect for adventure lovers looking to explore Goa''s off-road trails and beaches.', 
  ARRAY['Air Conditioning', 'Power Steering', 'Power Windows', 'Central Locking', 'USB Charging', 'Bluetooth Audio', 'Touchscreen Infotainment', '4x4 Drive', 'All-Terrain Tires'],
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/40087/thar-exterior-right-front-three-quarter-11.jpeg',
  ARRAY['https://imgd.aeplcdn.com/664x374/n/cw/ec/40087/thar-exterior-right-rear-three-quarter-10.jpeg', 'https://imgd.aeplcdn.com/664x374/n/cw/ec/40087/thar-exterior-right-side-view-3.jpeg', 'https://imgd.aeplcdn.com/664x374/n/cw/ec/40087/thar-interior-dashboard-2.jpeg']
);

-- Insert sample data for Testimonials
INSERT INTO testimonials (name, location, rating, comment, image) VALUES
(
  'Rahul Sharma', 
  'Delhi', 
  5, 
  'Excellent service! The car was in perfect condition and the staff was very helpful. Will definitely rent again on my next trip to Goa.',
  'https://randomuser.me/api/portraits/men/1.jpg'
),
(
  'Priya Patel', 
  'Mumbai', 
  5, 
  'Used GoDrive during our family vacation in Goa. The SUV was perfect for our needs and the unlimited kilometers was a huge plus!',
  'https://randomuser.me/api/portraits/women/2.jpg'
),
(
  'Vikram Singh', 
  'Bangalore', 
  4, 
  'Smooth booking process and good condition cars. Would have given 5 stars but pickup took a bit longer than expected.',
  'https://randomuser.me/api/portraits/men/3.jpg'
),
(
  'Ananya Desai', 
  'Pune', 
  5, 
  'The freedom to explore Goa on our own terms with a reliable car made our trip so much better. Highly recommend GoDrive!',
  'https://randomuser.me/api/portraits/women/4.jpg'
),
(
  'Arjun Nair', 
  'Chennai', 
  5, 
  'We rented the Thar for our Goa trip and it was the best decision ever! Perfect for beach hopping and exploring off-road paths.',
  'https://randomuser.me/api/portraits/men/5.jpg'
);

-- Create storage policy for public access to car images
INSERT INTO storage.buckets (id, name, public) VALUES ('car-images', 'car-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('brand-logos', 'brand-logos', true);

-- Set up RLS policies
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy for brands - everyone can view
CREATE POLICY "Public can view brands" 
  ON brands 
  FOR SELECT 
  USING (true);

-- Policy for cars - everyone can view
CREATE POLICY "Public can view cars" 
  ON cars 
  FOR SELECT 
  USING (true);

-- Policy for testimonials - everyone can view
CREATE POLICY "Public can view testimonials" 
  ON testimonials 
  FOR SELECT 
  USING (true);

-- Policy for contact messages - anyone can insert, only authenticated users can view
CREATE POLICY "Public can submit contact messages" 
  ON contact_messages 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view contact messages" 
  ON contact_messages 
  FOR SELECT 
  USING (auth.role() = 'authenticated'); 