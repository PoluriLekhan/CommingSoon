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

  const httpServer = createServer(app);
  return httpServer;
}
