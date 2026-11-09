import { MetadataRoute } from 'next';
import { getCars } from '@/lib/supabase';
import { getBlogs } from '@/lib/blogs';
import { locationsData } from '@/lib/location-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ziocarrentals.com';
  
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cars`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Unique location routes from locationsData
  const uniqueLocationUrls = new Set<string>();
  Object.values(locationsData).forEach((config) => {
    if (config.canonicalUrl) {
      uniqueLocationUrls.add(config.canonicalUrl);
    }
  });

  const locationRoutes: MetadataRoute.Sitemap = Array.from(uniqueLocationUrls).map((url) => ({
    url,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Cars routes
  let carRoutes: MetadataRoute.Sitemap = [];
  try {
    const cars = await getCars();
    carRoutes = (cars || []).map((car) => ({
      url: `${baseUrl}/cars/${car.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch (e) {
    console.error("Error fetching cars for sitemap:", e);
  }

  // Blog routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await getBlogs();
    blogRoutes = (blogs || []).map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch (e) {
    console.error("Error fetching blogs for sitemap:", e);
  }
  
  return [...staticRoutes, ...locationRoutes, ...carRoutes, ...blogRoutes];
}
