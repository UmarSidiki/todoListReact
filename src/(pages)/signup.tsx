import { SignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const SignInPage = () => {
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
      <div className="relative min-h-screen flex items-center justify-center px-4">

        {/* SignIn Component with Animation */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-md w-full"
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

          <SignIn
            signUpUrl="/sign-up"
            appearance={{
              layout: {
                socialButtonsVariant: "iconButton", // Icon-only social buttons
                shimmer: true, // Subtle shimmer effect
              },
              variables: {
                colorPrimary: "#4CAF50", // Green accent
                colorTextOnPrimaryBackground: "#FFFFFF", // White on green buttons
                colorBackground: "transparent", // Light background
                
                borderRadius: "12px", // Rounded corners
                fontFamily: "Inter, sans-serif", // Modern font
              },
              elements: {
                // Card (Outer Container)
                card: "bg-white/20 dark:bg-neutral-800/30 backdrop-blur-lg border border-white/30 dark:border-neutral-700 rounded-xl shadow-xl p-6 max-w-md w-full",

                // Header
                headerTitle: "text-2xl font-bold text-neutral-900 dark:text-white text-center",
                headerSubtitle: "text-neutral-600 dark:text-neutral-300 text-center mt-1",

                // Form Box (Inner Container)
                formBox: "bg-white/10 dark:bg-neutral-900/30 backdrop-blur-md border border-white/20 dark:border-neutral-700 rounded-lg shadow-lg p-4",

                // Inputs
                formFieldInput:
                  "bg-white/30 dark:bg-neutral-800/50 backdrop-blur-sm border border-white/20 dark:border-neutral-600 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200",

                // Labels
                formFieldLabel: "text-neutral-700 dark:text-neutral-200 text-sm font-medium mb-1",

                // Primary Button
                formButtonPrimary:
                  "bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200",

                // Social Buttons
                socialButtonsIconButton:
                  "bg-white/30 dark:bg-neutral-800/50 backdrop-blur-sm border border-white/20 dark:border-neutral-600 rounded-lg p-2 hover:bg-white/40 dark:hover:bg-neutral-700/50 transition-all duration-200",

                // Footer
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

export default SignInPage;