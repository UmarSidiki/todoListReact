import { UserProfile } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const UserProfilePage = () => {
  // Animation variants for content entrance
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Animation for floating sparkles
  const particleVariants = {
    animate: {
      y: [0, -15, 0],
      opacity: [0, 1, 0],
      transition: { duration: 2.5, repeat: Infinity, ease: "easeOut" },
    },
  };

  return (
    <section>
      <div className="relative min-h-screen flex items-center justify-center px-4 py-10">
        {/* UserProfile Component with Animation */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-2xl w-full md:-ml-36"
        >
          {/* Floating Sparkles */}
          <motion.div
            variants={particleVariants}
            animate="animate"
            className="absolute top-4 left-1/4"
          >
            <Sparkles className="w-5 h-5 text-green-300 dark:text-green-200 opacity-50" />
          </motion.div>
          <motion.div
            variants={particleVariants}
            animate="animate"
            className="absolute top-8 right-1/4"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 dark:text-yellow-200 opacity-50" />
          </motion.div>

          <UserProfile
            appearance={{
              variables: {
                colorPrimary: "#4CAF50", // Green accent
                colorTextOnPrimaryBackground: "#FFFFFF", // White on green buttons
                borderRadius: "12px", // Rounded corners
                fontFamily: "Inter, sans-serif", // Modern font
                colorBackground: "transparent", // Light background
              },
              elements: {
                // Profile Card (Outer Container)
                card: "bg-white/20 dark:bg-neutral-800/30 backdrop-blur-lg border border-white/30 dark:border-neutral-700 rounded-xl shadow-xl p-6 max-w-2xl w-full",

                // Navbar (Left Sidebar in UserProfile)
                navbar: "bg-white/10 dark:bg-neutral-900/30 backdrop-blur-md border-r border-white/20 dark:border-neutral-700",
                navbarButton:
                  "text-neutral-700 dark:text-neutral-200 hover:bg-white/10 dark:hover:bg-neutral-900/20 rounded-lg p-2 transition-all duration-200",
                navbarButtonIcon: "text-neutral-600 dark:text-neutral-300",

                // Page Content
                page: "bg-white/10 dark:bg-neutral-900/30 backdrop-blur-md rounded-lg p-4",
                pageHeader: "text-2xl font-bold text-neutral-900 dark:text-white",
                pageContent: "text-neutral-700 dark:text-neutral-200",

                // Form Elements (used in profile editing)
                formFieldInput:
                  "bg-white/30 dark:bg-neutral-800/50 backdrop-blur-sm border border-white/20 dark:border-neutral-600 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200",
                formFieldLabel: "text-neutral-700 dark:text-neutral-200 text-sm font-medium mb-1",
                formButtonPrimary:
                  "bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200",

                // Footer (e.g., navigation or action buttons)
                footer: "bg-white/10 dark:bg-neutral-900/30 backdrop-blur-md rounded-b-lg p-2",
                footerActionLink: "text-green-500 hover:text-green-600 font-medium transition-colors duration-200",
                footerActionText: "text-neutral-600 dark:text-neutral-300",

                // General Text
                text: "text-neutral-700 dark:text-neutral-200",
              },
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default UserProfilePage;