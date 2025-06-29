import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Download, Mail, Users, Calendar, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminLogin from "@/components/admin-login";
import type { EmailSubscription } from "@shared/schema";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const loginStatus = localStorage.getItem("adminLoggedIn");
    const loginTime = localStorage.getItem("adminLoginTime");
    
    if (loginStatus === "true" && loginTime) {
      // Check if login is still valid (24 hours)
      const twentyFourHours = 24 * 60 * 60 * 1000;
      const isLoginValid = Date.now() - parseInt(loginTime) < twentyFourHours;
      
      if (isLoginValid) {
        setIsLoggedIn(true);
      } else {
        // Clear expired login
        localStorage.removeItem("adminLoggedIn");
        localStorage.removeItem("adminLoginTime");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminLoginTime");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />;
  }
  const [isExporting, setIsExporting] = useState(false);

  const { data: subscribersData, isLoading } = useQuery<{ subscribers: EmailSubscription[] }>({
    queryKey: ["/api/admin/subscribers"],
    staleTime: 30000, // 30 seconds
  });

  const subscribers = subscribersData?.subscribers || [];

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      const response = await fetch("/api/admin/subscribers/export");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "subscribers.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const generateEmailList = () => {
    return subscribers.map(sub => sub.email).join(", ");
  };

  const copyEmailList = () => {
    const emailList = generateEmailList();
    navigator.clipboard.writeText(emailList);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your email subscribers and launch notifications</p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{subscribers.length}</div>
                <p className="text-xs text-muted-foreground">
                  People waiting for launch
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ready to Notify</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{subscribers.length}</div>
                <p className="text-xs text-muted-foreground">
                  Email addresses ready
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Latest Signup</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {subscribers.length > 0 ? "Today" : "None"}
                </div>
                <p className="text-xs text-muted-foreground">
                  {subscribers.length > 0 ? formatDate(subscribers[subscribers.length - 1]?.subscribedAt).split(",")[0] : "No signups yet"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Export Actions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Launch Notification Tools</CardTitle>
              <CardDescription>
                Export subscriber data or copy email addresses to send launch notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={handleExportCSV}
                  disabled={isExporting || subscribers.length === 0}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  {isExporting ? "Exporting..." : "Download CSV"}
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={copyEmailList}
                  disabled={subscribers.length === 0}
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Copy All Emails
                </Button>
              </div>
              
              {subscribers.length > 0 && (
                <div className="p-4 bg-gray-100 rounded-lg">
                  <h4 className="font-medium mb-2">How to Send Launch Notifications:</h4>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. Click "Copy All Emails" to copy subscriber addresses</li>
                    <li>2. Open your email client (Gmail, Outlook, etc.)</li>
                    <li>3. Paste the emails in the BCC field</li>
                    <li>4. Write your launch announcement</li>
                    <li>5. Send to notify all subscribers!</li>
                  </ol>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Subscribers List */}
          <Card>
            <CardHeader>
              <CardTitle>Subscribers List</CardTitle>
              <CardDescription>
                All people waiting for your launch announcement
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : subscribers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No subscribers yet. Share your coming soon page to get signups!
                </div>
              ) : (
                <div className="space-y-3">
                  {subscribers.map((subscriber) => (
                    <motion.div
                      key={subscriber.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Mail className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-medium">{subscriber.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">
                          {formatDate(subscriber.subscribedAt)}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}