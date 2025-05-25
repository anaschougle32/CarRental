"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Car, FileText, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCars: 0,
    totalBlogs: 0,
    totalUsers: 0,
  });
  
  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total cars
        const { count: carsCount } = await supabase
          .from("cars")
          .select("*", { count: "exact", head: true });

        // Fetch total blogs
        const { count: blogsCount } = await supabase
          .from("blogs")
          .select("*", { count: "exact", head: true });

        // Fetch total users (excluding admins)
        const { count: usersCount } = await supabase
          .from("users")
          .select("*", { count: "exact", head: true });

        setStats({
          totalCars: carsCount || 0,
          totalBlogs: blogsCount || 0,
          totalUsers: usersCount || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCars}</div>
            <p className="text-xs text-muted-foreground">
              Available for rent
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBlogs}</div>
            <p className="text-xs text-muted-foreground">
              Published articles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Registered users
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 