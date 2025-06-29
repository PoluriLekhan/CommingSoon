import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { insertEmailSubscriptionSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import type { z } from "zod";

type EmailFormData = z.infer<typeof insertEmailSubscriptionSchema>;

interface EmailSignupFormProps {
  subscriberCount: number;
}

export default function EmailSignupForm({ subscriberCount }: EmailSignupFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<EmailFormData>({
    resolver: zodResolver(insertEmailSubscriptionSchema),
    defaultValues: {
      email: "",
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async (data: EmailFormData) => {
      const response = await apiRequest("POST", "/api/subscribe", data);
      return response.json();
    },
    onSuccess: (data) => {
      setIsSuccess(true);
      form.reset();
      toast({
        title: "Successfully subscribed!",
        description: data.message,
      });
      
      // Invalidate subscriber count to refresh it
      queryClient.invalidateQueries({ queryKey: ["/api/subscribers/count"] });
      
      // Reset success state after animation
      setTimeout(() => setIsSuccess(false), 3000);
    },
    onError: (error: any) => {
      const errorMessage = error.message || "An error occurred while subscribing. Please try again.";
      toast({
        title: "Subscription failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EmailFormData) => {
    subscribeMutation.mutate(data);
  };

  const displayCount = subscriberCount > 0 
    ? `Join ${subscriberCount.toLocaleString()}+ others waiting for launch`
    : "Be the first to know when we launch";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl text-center font-inter font-medium text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none input-focus transition-all duration-300 hover:border-gray-300 h-auto"
                    {...field}
                    disabled={subscribeMutation.isPending}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </FormControl>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit"
          disabled={subscribeMutation.isPending}
          className="w-full bg-black text-white py-4 px-8 rounded-2xl font-inter font-semibold text-lg hover:bg-gray-900 focus:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-black/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] premium-shadow h-auto"
        >
          <motion.span
            key={isSuccess ? 'success' : subscribeMutation.isPending ? 'loading' : 'default'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {isSuccess ? "Added!" : subscribeMutation.isPending ? "Notifying..." : "Notify Me"}
          </motion.span>
        </Button>
        
        <p className="text-sm text-gray-500 font-inter">
          {displayCount}
        </p>
      </form>
    </Form>
  );
}
