import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = contactSchema.parse(req.body);
      
      // Store the contact message
      const savedMessage = await storage.saveContactMessage(validatedData);
      
      // Return success response
      res.status(201).json({ 
        success: true, 
        message: "Message received successfully", 
        id: savedMessage.id 
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      
      // Handle other errors
      console.error("Error saving contact message:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to save your message. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
