import type { EmailSubscription } from "@shared/schema";

// Local storage keys
const SUBSCRIBERS_KEY = "coming_soon_subscribers";
const SUBSCRIBER_COUNT_KEY = "coming_soon_count";

export class LocalStorageService {
  // Get all subscribers
  static getSubscribers(): EmailSubscription[] {
    try {
      const data = localStorage.getItem(SUBSCRIBERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  // Add new subscriber
  static addSubscriber(email: string): { success: boolean; message: string; subscription?: EmailSubscription } {
    try {
      const subscribers = this.getSubscribers();
      
      // Check if email already exists
      const existingSubscriber = subscribers.find(sub => sub.email === email);
      if (existingSubscriber) {
        return {
          success: false,
          message: "This email is already subscribed to our newsletter."
        };
      }

      // Add new subscriber
      const newSubscriber: EmailSubscription = {
        id: subscribers.length + 1,
        email,
        subscribedAt: new Date()
      };

      subscribers.push(newSubscriber);
      localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify(subscribers));
      localStorage.setItem(SUBSCRIBER_COUNT_KEY, subscribers.length.toString());

      return {
        success: true,
        message: "Successfully subscribed! You'll be notified when we launch.",
        subscription: newSubscriber
      };
    } catch (error) {
      return {
        success: false,
        message: "An error occurred while subscribing. Please try again."
      };
    }
  }

  // Get subscriber count
  static getSubscriberCount(): number {
    const subscribers = this.getSubscribers();
    return subscribers.length;
  }

  // Generate CSV content
  static generateCSV(): string {
    const subscribers = this.getSubscribers();
    const csvHeader = "Email,Subscribed Date\n";
    const csvRows = subscribers.map(sub => 
      `${sub.email},${sub.subscribedAt.toString().split('T')[0]}`
    ).join('\n');
    return csvHeader + csvRows;
  }

  // Admin login check
  static checkAdminLogin(username: string, password: string): boolean {
    return username === "Lekhan" && password === "L2009@khan!";
  }
}