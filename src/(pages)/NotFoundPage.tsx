import { motion } from "framer-motion";
import { Compass, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button"; // Shadcn Button

const NotFound = () => {
  // Compass animation
  const compassVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, 10, -10, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  // Content animation
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Particle animation
  const particleVariants = {
    animate: {
      y: [0, -20, 0],
      opacity: [0, 1, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-neutral-50 to-green-50 dark:from-neutral-900 dark:via-neutral-900/20 dark:to-green-900/20" />
        <div className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-neutral-400/20 rounded-full blur-3xl animate-pulse delay-500" />
          <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-yellow-400/20 rounded-full blur-3xl animate-pulse delay-1500" />
        </div>
      </div>

      {/* Content */}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center space-y-8"
      >
        {/* Floating Particles */}
        <motion.div
          variants={particleVariants}
          animate="animate"
          className="absolute top-1/4 left-1/2 -translate-x-1/2"
        >
          <Sparkles className="w-6 h-6 text-green-300 dark:text-green-200 opacity-50" />
        </motion.div>
        <motion.div
          variants={particleVariants}
          animate="animate"
          className="absolute top-1/3 right-1/3"
        >
          <Sparkles className="w-4 h-4 text-yellow-300 dark:text-yellow-200 opacity-50" />
        </motion.div>

        {/* Compass Icon */}
        <motion.div variants={compassVariants} initial="initial" animate="animate">
          <Compass className="w-24 h-24 text-green-400 dark:text-green-300 mx-auto" />
        </motion.div>

        {/* 404 Message */}
        <h1 className="text-6xl md:text-8xl font-bold text-neutral-900 dark:text-white">
          404
        </h1>
        <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400">
          Oops, we’re wandering off the map!
        </p>

        {/* Action */}
        <Button
          asChild
          variant="default"
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          <a href="/" className="flex items-center gap-2">
            <Compass className="w-4 h-4" />
            Find Your Way Home
          </a>
        </Button>

        {/* Easter Egg */}
        <p
          className="text-sm mt-6 text-neutral-400 dark:text-neutral-500 cursor-help"
          title="Lost? Just vibe with us!"
        >
          <Sparkles className="inline w-4 h-4 text-yellow-400 mr-1" />
          Stranded with style by RexTodo
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;