# Admin Guide for ZioCarRentals Website

This guide explains how to manage the content on the ZioCarRentals website, including adding new cars and blog posts.

## Prerequisites

1. Supabase account with access to the project
2. Image hosting capability for car photos and blog images

## Adding New Cars

### Option 1: Using Supabase Dashboard (Recommended)

1. Log in to the [Supabase Dashboard](https://app.supabase.com/) and select the project
2. Navigate to the **Table Editor** in the left sidebar
3. Select the `cars` table
4. Click the **Insert** button in the top right
5. Fill in the following fields:
   - `name`: The model name of the car (e.g., "Swift", "i20")
   - `slug`: A unique URL-friendly identifier (e.g., "maruti-swift", "hyundai-i20")
   - `brand_id`: Select from the dropdown (must match a valid brand in the brands table)
   - `price_per_day`: The daily rental rate in INR (e.g., 1200)
   - `transmission`: Either "Manual" or "Automatic"
   - `fuel_type`: "Petrol", "Diesel", or "Electric"
   - `seats`: Number of seats (e.g., 5)
   - `luggage`: Number of large suitcases that can fit (e.g., 2)
   - `description`: Detailed description of the car
   - `features`: Array of features (e.g., ["Air Conditioning", "Power Steering"])
   - `main_image`: URL to the main image of the car
   - `images`: Array of additional image URLs
6. Click **Save** to add the car to the database

### Option 2: Using SQL

Execute the following SQL in the Supabase SQL Editor:

```sql
INSERT INTO cars (
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
)
SELECT 
  'Car Model Name',  -- Replace with actual car model
  'brand-car-model', -- Replace with URL-friendly slug
  id,                -- This selects the brand_id automatically
  1500,              -- Daily price in INR
  'Automatic',       -- Transmission type
  'Petrol',          -- Fuel type
  5,                 -- Number of seats
  2,                 -- Luggage capacity
  'Detailed description of the car...',
  ARRAY['Feature 1', 'Feature 2', 'Feature 3'],
  'https://example.com/main-image.jpg',
  ARRAY['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
FROM brands 
WHERE name = 'Brand Name'  -- Replace with actual brand name
```

### Adding a New Brand

If the car brand doesn't exist yet:

1. First, add the brand to the `brands` table:

```sql
INSERT INTO brands (name, logo)
VALUES ('New Brand Name', 'https://example.com/logo.png');
```

2. Then proceed with adding the car as shown above

## Adding New Blog Posts

### Option 1: Using Supabase Dashboard

1. Log in to the Supabase Dashboard and select the project
2. Navigate to the **Table Editor** in the left sidebar
3. Select the `blogs` table
4. Click the **Insert** button in the top right
5. Fill in the following fields:
   - `title`: The title of the blog post
   - `slug`: A unique URL-friendly identifier (e.g., "best-beaches-in-goa")
   - `excerpt`: A short summary (1-2 sentences) shown in previews
   - `content`: The full content in Markdown format
   - `cover_image`: URL to the main image
   - `author`: Name of the author
6. Click **Save** to publish the blog post

### Option 2: Using SQL

Execute the following SQL in the Supabase SQL Editor:

```sql
INSERT INTO blogs (
  title,
  slug,
  excerpt,
  content,
  cover_image,
  author
)
VALUES (
  'Your Blog Post Title',
  'your-blog-post-slug',
  'A brief summary of what the blog post is about.',
  'Full markdown content of the blog post goes here. 
  
  ## Subheading
  
  Content with **bold text** and *italics* as needed.',
  'https://example.com/cover-image.jpg',
  'Author Name'
);
```

## Best Practices for Images

1. **Image Optimization**:
   - Resize car images to approximately 800×600 pixels
   - Compress images to reduce file size (use tools like TinyPNG)
   - Use JPG format for photographs

2. **Image Hosting**:
   - Host images on a reliable service (e.g., AWS S3, Cloudinary)
   - Ensure the hosting service provides fast delivery

3. **Image Naming**:
   - Use descriptive names for images (e.g., "honda-city-front-view.jpg")
   - Avoid spaces in filenames (use hyphens instead)

## Content Guidelines

### Car Descriptions

- Keep descriptions between 100-150 words
- Highlight key features and benefits
- Mention ideal use cases (e.g., "perfect for families", "ideal for beach trips")
- Include specific details about the car model

### Blog Posts

- Use Markdown formatting for all blog content
- Include at least one image per blog post
- Organize content with headings and subheadings
- Target 800-1500 words for blog posts
- Include relevant keywords naturally
- Add internal links to car rental pages where appropriate

## Technical Support

For technical issues or questions, please contact the development team at dev@ziocarrentals.com or open an issue in the project's GitHub repository. 