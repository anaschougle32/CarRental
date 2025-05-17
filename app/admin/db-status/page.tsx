import { Metadata } from "next";
import { checkSupabaseEnv } from "@/lib/checkEnv";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, CheckCircle2, ExternalLink, Database, Table as TableIcon, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const metadata: Metadata = {
  title: "Database Status - Admin",
  description: "Check the status of your Supabase database connection and tables",
};

async function getDbStatus() {
  const envStatus = checkSupabaseEnv();
  
  // Default status with connection info
  const status = {
    connection: { success: false, message: "" },
    tables: {
      brands: { exists: false, count: 0 },
      cars: { exists: false, count: 0 },
      testimonials: { exists: false, count: 0 },
      contact_messages: { exists: false, count: 0 },
    },
    counts: {
      brands: 0,
      cars: 0,
      testimonials: 0,
      contact_messages: 0,
    }
  };
  
  // If environment variables are not set, return early
  if (!envStatus.status.allPresent) {
    status.connection = {
      success: false,
      message: "Missing environment variables for Supabase connection"
    };
    return { status, envStatus };
  }
  
  // Test connection
  try {
    const { error } = await supabase.from('cars').select('count');
    
    if (error) {
      status.connection = {
        success: false,
        message: `Error connecting to Supabase: ${error.message}`
      };
      return { status, envStatus };
    }
    
    status.connection = {
      success: true,
      message: "Successfully connected to Supabase"
    };
    
    // Check tables and get counts
    const tables = ['brands', 'cars', 'testimonials', 'contact_messages'];
    
    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('count');
      
      if (!error) {
        status.tables[table].exists = true;
        status.counts[table] = data[0]?.count || 0;
      }
    }
  } catch (error) {
    status.connection = {
      success: false,
      message: `Error testing connection: ${error instanceof Error ? error.message : String(error)}`
    };
  }
  
  return { status, envStatus };
}

export default async function DbStatusPage() {
  const { status, envStatus } = await getDbStatus();

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 pt-24 md:pt-32">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Database Status</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          Check the status of your Supabase database connection and tables.
        </p>
      </div>
      
      {/* Environment Variables */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Environment Variables</CardTitle>
          <CardDescription>Status of required environment variables for Supabase</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Variable</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>NEXT_PUBLIC_SUPABASE_URL</TableCell>
                <TableCell>
                  {envStatus.status.supabaseUrl ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </TableCell>
                <TableCell>{envStatus.values.supabaseUrl}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NEXT_PUBLIC_SUPABASE_ANON_KEY</TableCell>
                <TableCell>
                  {envStatus.status.supabaseAnonKey ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </TableCell>
                <TableCell>{envStatus.values.supabaseAnonKey}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NEXT_PUBLIC_BASE_URL</TableCell>
                <TableCell>
                  {envStatus.status.baseUrl ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </TableCell>
                <TableCell>{envStatus.values.baseUrl}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            {envStatus.status.allPresent 
              ? "All environment variables are set correctly."
              : "Some environment variables are missing. Please check your .env.local file."}
          </p>
        </CardFooter>
      </Card>
      
      {/* Connection Status */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Supabase Connection</CardTitle>
          <CardDescription>Status of connection to Supabase</CardDescription>
        </CardHeader>
        <CardContent>
          {status.connection.success ? (
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-500">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <AlertTitle>Connection Successful</AlertTitle>
              <AlertDescription>{status.connection.message}</AlertDescription>
            </Alert>
          ) : (
            <Alert className="bg-red-50 dark:bg-red-900/20 border-red-500">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <AlertTitle>Connection Failed</AlertTitle>
              <AlertDescription>{status.connection.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild>
            <Link href="https://app.supabase.com" target="_blank">
              Open Supabase Dashboard
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      {/* Tables Status */}
      {status.connection.success && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Database Tables</CardTitle>
            <CardDescription>Status of required tables in your Supabase database</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Table</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Record Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(status.tables).map(([table, { exists }]) => (
                  <TableRow key={table}>
                    <TableCell className="font-mono">{table}</TableCell>
                    <TableCell>
                      {exists ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                    </TableCell>
                    <TableCell>{exists ? status.counts[table] : "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-gray-500">
              {Object.values(status.tables).every(t => t.exists)
                ? "All required tables exist in your database."
                : "Some tables are missing. Please run the setup SQL script."}
            </p>
            <Button variant="outline" asChild>
              <Link href="/supabase_schema.sql" target="_blank">
                View Schema Script
                <Database className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Refresh Button */}
      <div className="flex justify-center">
        <Button className="mt-4" asChild>
          <Link href="/admin/db-status">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Status
          </Link>
        </Button>
      </div>
    </div>
  );
} 