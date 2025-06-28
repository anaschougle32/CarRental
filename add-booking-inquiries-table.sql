-- Create the update function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create booking inquiries table for hero form submissions
CREATE TABLE IF NOT EXISTS booking_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  pickup_location TEXT NOT NULL,
  drop_location TEXT NOT NULL,
  pickup_date DATE NOT NULL,
  pickup_time TIME NOT NULL,
  drop_date DATE NOT NULL,
  drop_time TIME NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'booked', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE booking_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public to insert booking inquiries
CREATE POLICY "Allow public to insert booking inquiries" 
  ON booking_inquiries FOR INSERT WITH CHECK (true);

-- Allow admin to read all booking inquiries
CREATE POLICY "Enable all for admin users on booking inquiries"
  ON booking_inquiries
  FOR ALL
  TO service_role;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS booking_inquiries_created_at_idx ON booking_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS booking_inquiries_status_idx ON booking_inquiries(status);

-- Add trigger for updated_at
CREATE TRIGGER update_booking_inquiries_updated_at
BEFORE UPDATE ON booking_inquiries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add comment
COMMENT ON TABLE booking_inquiries IS 'Booking inquiries submitted through the hero form'; 