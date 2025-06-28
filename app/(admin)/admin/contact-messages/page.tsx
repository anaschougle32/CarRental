"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Search, Mail, Phone, User, MessageSquare, Calendar, Loader2 } from "lucide-react";
import { getContactMessages } from "@/lib/supabase/index";
import { format } from "date-fns";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = messages.filter(
        (message) =>
          message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.phone.includes(searchTerm) ||
          message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMessages(filtered);
    } else {
      setFilteredMessages(messages);
    }
  }, [searchTerm, messages]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await getContactMessages();
      setMessages(data);
      setFilteredMessages(data);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading contact messages...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <p className="text-muted-foreground">
            Manage customer inquiries from the contact form
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {filteredMessages.length} Messages
        </Badge>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, phone, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Messages Found</h3>
              <p className="text-muted-foreground">
                {searchTerm
                  ? "No messages match your search criteria."
                  : "No contact messages have been submitted yet."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredMessages.map((message) => (
            <Card key={message.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {message.name}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <a 
                          href={`mailto:${message.email}`}
                          className="hover:text-primary hover:underline"
                        >
                          {message.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <a 
                          href={`tel:${message.phone}`}
                          className="hover:text-primary hover:underline"
                        >
                          {message.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(message.created_at), "MMM dd, yyyy 'at' h:mm a")}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Separator />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Message:
                    </Label>
                    <p className="mt-1 text-sm leading-relaxed whitespace-pre-wrap">
                      {message.message}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" asChild>
                      <a href={`mailto:${message.email}?subject=Re: Your inquiry&body=Hi ${message.name},%0D%0A%0D%0AThank you for contacting ZioCarRentals.`}>
                        Reply via Email
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={`tel:${message.phone}`}>
                        Call Customer
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 