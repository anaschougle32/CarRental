"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  Car,
  FileText,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Settings },
  { name: "Cars", href: "/admin/cars", icon: Car },
  { name: "Locations", href: "/admin/locations", icon: MapPin },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Users", href: "/admin/users", icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    // Remove the admin session cookie
    Cookies.remove("admin_session", { path: "/" });
    // Redirect to login page
    router.push("/adminlogin");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          sidebarOpen ? "block" : "hidden"
        )}
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white dark:bg-gray-800">
          <div className="flex h-16 items-center justify-between px-4">
            <h2 className="text-lg font-semibold">Admin Panel</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                  pathname === item.href
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-6 w-6",
                    pathname === item.href
                      ? "text-gray-500 dark:text-gray-300"
                      : "text-gray-400 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                  )}
                />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 dark:text-red-400"
              onClick={handleSignOut}
            >
              <LogOut className="mr-3 h-6 w-6" />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex h-16 items-center px-4">
            <h2 className="text-lg font-semibold">Admin Panel</h2>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                  pathname === item.href
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-6 w-6",
                    pathname === item.href
                      ? "text-gray-500 dark:text-gray-300"
                      : "text-gray-400 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                  )}
                />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 dark:text-red-400"
              onClick={handleSignOut}
            >
              <LogOut className="mr-3 h-6 w-6" />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white dark:bg-gray-800 shadow lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="px-4"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 