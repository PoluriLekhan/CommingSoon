import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSubscriptionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Email subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = insertEmailSubscriptionSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscription = await storage.getEmailSubscription(validatedData.email);
      if (existingSubscription) {
        return res.status(409).json({ 
          message: "This email is already subscribed to our newsletter." 
        });
      }

      const subscription = await storage.createEmailSubscription(validatedData);
      res.status(201).json({ 
        message: "Successfully subscribed! You'll be notified when we launch.",
        subscription: { id: subscription.id, email: subscription.email }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Please enter a valid email address.",
          errors: error.errors 
        });
      }
      
      console.error("Email subscription error:", error);
      res.status(500).json({ 
        message: "An error occurred while subscribing. Please try again." 
      });
    }
  });

  // Get subscription count (for display purposes)
  app.get("/api/subscribers/count", async (req, res) => {
    try {
      const subscriptions = await storage.getAllEmailSubscriptions();
      res.json({ count: subscriptions.length });
    } catch (error) {
      console.error("Error getting subscriber count:", error);
      res.status(500).json({ message: "Unable to get subscriber count" });
    }
  });

  // Admin endpoint to get all subscribers
  app.get("/api/admin/subscribers", async (req, res) => {
    try {
      const subscriptions = await storage.getAllEmailSubscriptions();
      res.json({ subscribers: subscriptions });
    } catch (error) {
      console.error("Error getting subscribers:", error);
      res.status(500).json({ message: "Unable to get subscribers" });
    }
  });

  // Admin endpoint to export subscribers as CSV
  app.get("/api/admin/subscribers/export", async (req, res) => {
    try {
      const subscriptions = await storage.getAllEmailSubscriptions();
      
      // Generate CSV content
      const csvHeader = "Email,Subscribed Date\n";
      const csvRows = subscriptions.map(sub => 
        `${sub.email},${sub.subscribedAt.toISOString().split('T')[0]}`
      ).join('\n');
      
      const csvContent = csvHeader + csvRows;
      
      // Set headers for file download
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="subscribers.csv"');
      res.send(csvContent);
    } catch (error) {
      console.error("Error exporting subscribers:", error);
      res.status(500).json({ message: "Unable to export subscribers" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
