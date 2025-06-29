import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import EmailSignupForm from "@/components/email-signup-form";

export default function Home() {
  const { data: subscriberData } = useQuery({
    queryKey: ["/api/subscribers/count"],
    staleTime: 60000, // 1 minute
  });

  const subscriberCount = subscriberData?.count || 0;

  return (
    <div className="min-h-screen bg-white text-black font-inter antialiased overflow-x-hidden">
      {/* Background Visual Element */}
      <div className="fixed inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080" 
          alt="Abstract luxury geometric composition" 
          className="w-full h-full object-cover opacity-5 animate-float"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80"></div>
      </div>

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

          {/* Visual Centerpiece */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          >
            <div className="relative group">
              <img 
                src="https://cdn.pixabay.com/photo/2021/01/15/17/01/drift-5919647_1280.jpg" 
                alt="Abstract 3D metallic object with premium lighting" 
                className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-3xl premium-shadow transition-transform duration-700 group-hover:scale-105 animate-float"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-black/10 to-transparent group-hover:from-black/5 transition-all duration-500"></div>
            </div>
          </motion.div>

          {/* Email Signup Form */}
          <motion.div 
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
          >
            <EmailSignupForm subscriberCount={subscriberCount} />
          </motion.div>

          {/* Additional Visual Elements */}
          <motion.div 
            className="flex justify-center space-x-8 opacity-30"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 0.3, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" 
              alt="Minimal luxury design element - geometric forms" 
              className="w-16 h-12 md:w-20 md:h-16 object-cover rounded-lg animate-pulse-slow"
            />
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
        </motion.footer>

      </main>
    </div>
  );
}
