import { redirect } from 'next/navigation';

export default function AdminPage() {
  // Redirect to the admin dashboard
  redirect('/admin/dashboard');
  
  // This return is a fallback in case redirect doesn't work
  return null;
}
