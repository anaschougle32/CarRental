-- Fix RLS policies to allow authenticated admin users to access data

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Enable all for admin users on booking inquiries" ON booking_inquiries;
DROP POLICY IF EXISTS "Enable all for admin users" ON contact_messages;

-- Create new policies that allow authenticated users to read data
-- (assuming admin users are authenticated)

-- Booking inquiries policies
CREATE POLICY "Allow authenticated users to read booking inquiries" 
  ON booking_inquiries FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users to update booking inquiries" 
  ON booking_inquiries FOR UPDATE 
  TO authenticated 
  USING (true);

-- Contact messages policies  
CREATE POLICY "Allow authenticated users to read contact messages" 
  ON contact_messages FOR SELECT 
  TO authenticated 
  USING (true);

-- Keep service role access for both tables
CREATE POLICY "Enable all for service role on booking inquiries"
  ON booking_inquiries
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Enable all for service role on contact messages"
  ON contact_messages
  FOR ALL
  TO service_role
  USING (true);

-- Alternative: If you want to disable RLS temporarily for testing, uncomment these:
-- ALTER TABLE booking_inquiries DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY; 