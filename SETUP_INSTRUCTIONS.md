# ZioCarRentals Setup Instructions

## Database Setup

To enable the contact form and booking inquiry functionality, you need to run the following SQL commands in your Supabase SQL editor:

### 1. Run the Booking Inquiries Table Setup
```sql
-- Execute the contents of add-booking-inquiries-table.sql
```

This will create:
- `booking_inquiries` table for storing hero form submissions
- Proper indexes for performance
- Row Level Security policies
- Status tracking (pending, contacted, booked, cancelled)

### 2. Verify Existing Tables
The following tables should already exist from the main database setup:
- `contact_messages` - for contact form submissions
- `cars`, `brands`, `locations` - for car rental data
- `blogs` - for blog functionality

### 3. Test the Setup
1. Submit a booking inquiry through the hero form on the homepage
2. Submit a contact message through the contact form
3. Check the admin panel at `/admin/booking-inquiries` and `/admin/contact-messages`

## Form Functionality

### Hero Form (Homepage)
- **Before**: Simple form that redirected to cars page
- **After**: Collects user data, saves to database, then redirects
- **Fields**: Name, Phone, Pickup Location, Drop Location, Pickup Date/Time, Drop Date/Time
- **Validation**: All fields are required
- **Success**: Shows success toast and redirects after 1.5 seconds

### Contact Form
- **Location**: Contact page and footer
- **Fields**: Name, Email, Phone, Message
- **Functionality**: Saves to `contact_messages` table
- **Validation**: Form validation with error messages

### Admin Panel
New admin pages added:
- `/admin/booking-inquiries` - View and manage booking requests
- `/admin/contact-messages` - View and respond to contact messages
- **Features**: Search, filter, status updates, direct call/email links

## Database Schema

### booking_inquiries table
```sql
- id (UUID, Primary Key)
- name (Text, Required)
- phone (Text, Required) 
- pickup_location (Text, Required)
- drop_location (Text, Required)
- pickup_date (Date, Required)
- pickup_time (Time, Required)
- drop_date (Date, Required)
- drop_time (Time, Required)
- status (Text, Default: 'pending')
- created_at (Timestamp)
- updated_at (Timestamp)
```

### contact_messages table (existing)
```sql
- id (UUID, Primary Key)
- name (Text, Required)
- email (Text, Required)
- phone (Text, Required)
- message (Text, Required)
- created_at (Timestamp)
```

## Security
- Both tables have Row Level Security enabled
- Public users can INSERT only
- Admin users (service_role) can perform all operations
- Proper indexes for performance

## Next Steps
1. Run the SQL setup command
2. Test both forms
3. Access admin panel to manage inquiries
4. Set up email notifications (optional)
5. Configure WhatsApp integration for bookings (optional) 