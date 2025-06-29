import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EmailSignupForm from "@/components/email-signup-form";
import { LocalStorageService } from "@/lib/localStorage";

export default function Home() {
  const [subscriberCount, setSubscriberCount] = useState(0);

  useEffect(() => {
    setSubscriberCount(LocalStorageService.getSubscriberCount());
  }, []);

  const handleSubscriberAdded = () => {
    setSubscriberCount(LocalStorageService.getSubscriberCount());
  };

  return (
    <div className="min-h-screen bg-white text-black font-inter antialiased overflow-x-hidden">


      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 py-8">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          {/* Hero Section */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Main Headline */}
            <h1 className="font-playfair font-black text-hero gradient-text tracking-tight">
              COMING
              <br />
              <span className="block">SOON</span>
            </h1>
            
            {/* Subheadline */}
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-gray-600 font-inter font-light max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
              Something extraordinary is on the horizon. 
              <span className="block mt-2 font-medium text-black">Be the first to experience the future.</span>
            </motion.p>
          </motion.div>



          {/* Email Signup Form */}
          <motion.div 
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          >
            <EmailSignupForm subscriberCount={subscriberCount} onSubscriberAdded={handleSubscriberAdded} />
          </motion.div>



        </div>

        {/* Footer */}
        <motion.footer 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 1.5 }}
        >
          <p className="text-sm text-gray-400 font-inter">
            © 2024. All rights reserved.
          </p>
          <a 
            href="/admin" 
            className="text-xs text-gray-300 hover:text-gray-500 transition-colors duration-200 mt-2 block"
          >
            Admin
          </a>
        </motion.footer>

      </main>
    </div>
  );
}
