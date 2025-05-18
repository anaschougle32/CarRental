# Car Rental Website

A modern car rental website built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- Browse cars with filtering by type, fuel, transmission, and price
- Detailed car information with image galleries
- Admin dashboard to view database status
- Mobile responsive design
- SEO optimized

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS for styling
- Supabase for database and authentication
- Shadcn UI for component library

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/car-rental-website.git
   cd car-rental-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

The application uses Supabase as a backend. You need to set up the following tables:

- cars
- brands
- testimonials
- contact_messages

You can find the SQL schema at `/supabase_schema.sql`.

## Deployment

### Deploying to Vercel

1. Create a Vercel account if you don't have one.

2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

4. Deploy the project:
   ```bash
   vercel
   ```

5. Set up environment variables in the Vercel dashboard:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - NEXT_PUBLIC_BASE_URL (your deployed URL)

6. For production deployment:
   ```bash
   vercel --prod
   ```

### Alternative Deployment Options

- **Netlify**: Use the `netlify.toml` file for configuration.
- **Docker**: Use the provided Dockerfile for containerized deployment.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 