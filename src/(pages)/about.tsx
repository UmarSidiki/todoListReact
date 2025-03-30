import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star, Sparkles, Rocket, Zap, Map } from "lucide-react";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const floatVariants = {
    hover: { y: -5, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center px-4 sm:px-6 py-24 overflow-hidden">

      {/* Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl text-center space-y-12"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            <Star className="w-6 h-6 text-green-400 animate-pulse delay-100" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            Crafting Productivity<br/>with <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Purpose</span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            RexTodo blends intuitive design with thoughtful features to transform your task management experience
          </p>
        </motion.div>

        {/* Value Propositions */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          <motion.div
            whileHover="hover"
            variants={floatVariants}
            className="p-6 bg-white/90 dark:bg-neutral-800/90 rounded-xl border border-neutral-200/80 dark:border-neutral-700 backdrop-blur-sm space-y-4 text-left"
          >
            <Rocket className="w-8 h-8 text-green-500" />
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
              Streamlined Workflow
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Intelligent prioritization and clean interfaces that adapt to your working style
            </p>
          </motion.div>

          <motion.div
            whileHover="hover"
            variants={floatVariants}
            className="p-6 bg-white/90 dark:bg-neutral-800/90 rounded-xl border border-neutral-200/80 dark:border-neutral-700 backdrop-blur-sm space-y-4 text-left"
          >
            <Zap className="w-8 h-8 text-yellow-500" />
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
              Smart Automation
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Focus on what matters while we handle the routine with intelligent reminders
            </p>
          </motion.div>
        </motion.div>

        {/* Philosophy Section */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full">
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              Our Philosophy
            </span>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-xl text-neutral-900 dark:text-white">
              "We believe productivity tools should empower without overwhelming. Our approach combines thoughtful design with just the right amount of delight."
            </p>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div variants={itemVariants} className="pt-8">
        <Button
          asChild
          variant="default"
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          <a href="/" className="flex items-center gap-2">
            <Map className="w-4 h-4" />
            Start Your Journey
          </a>
        </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;