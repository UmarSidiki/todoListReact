import { Button } from "@/components/ui/button";
import { SignedOut } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// SVG Imports (assuming raw SVG files)
import TaskManagementSvg from "@/assets/TaskManagementSvg.svg";
import ProductivitySvg from "@/assets/ProductivitySvg.svg";
import SyncSvg from "@/assets/sync-svgrepo-com.svg";
import RocketSvg from "@/assets/rocket-svgrepo-com.svg";
import ChecklistSvg from "@/assets/checklist-svgrepo-com.svg";
import TrophySvg from "@/assets/trophy-svgrepo-com.svg";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const HomeNoLoggedIn = () => {
  return (
    <section className="relative flex flex-col items-center text-center px-4 sm:px-6 py-12 min-h-screen overflow-hidden">

      {/* Hero Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative flex flex-col items-center mb-16 z-10 max-w-4xl pt-15"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 bg-neutral-100 dark:bg-neutral-900/30 px-4 py-2 rounded-full mb-4"
        >
          <img src={RocketSvg} alt="Rocket" className="w-5 h-5" />
          <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
            Your productivity journey starts here
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6"
        >
          <span className="bg-gradient-to-r from-green-900 dark:from-green-300 to-green-500 bg-clip-text text-transparent">
            RexTodo
          </span>{" "}
          helps you achieve more
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mb-8"
        >
          The all-in-one task management solution designed to streamline your
          workflow, boost your efficiency, and help you focus on what truly
          matters.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <SignedOut>
            <NavLink to="/sign-in">
              <Button className="px-8 py-4 text-lg rounded-xl shadow-lg bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-700 hover:to-green-700 transition-colors duration-300">
                Get Started - It’s Free
              </Button>
            </NavLink>
            <NavLink to="/features">
              <Button
                variant="outline"
                className="px-8 py-4 text-lg rounded-xl border-neutral-300 dark:border-neutral-600 transition-colors duration-300"
              >
                Learn More
              </Button>
            </NavLink>
          </SignedOut>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative w-full max-w-4xl aspect-video bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-700"
        >
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
            <div className="text-center p-8">
              <img
                src={ChecklistSvg}
                alt="Checklist"
                className="w-16 h-16 mx-auto"
              />
              <h3 className="text-xl font-semibold mt-4 text-neutral-800 dark:text-neutral-200">
                Your tasks, organized beautifully
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                Experience the clean, intuitive interface
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Trusted By Section */}
      <div className="relative my-16 w-full max-w-5xl z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm text-neutral-500 dark:text-neutral-400 mb-6"
        >
          Trusted by teams and individuals worldwide
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-70"
        >
          {["TechCorp", "InnoVate", "SwiftSolutions", "Nexus", "Prime"].map(
            (company) => (
              <motion.div
                key={company}
                whileHover={{ scale: 1.1 }}
                className="text-lg font-medium text-neutral-700 dark:text-neutral-300"
              >
                {company}
              </motion.div>
            )
          )}
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="relative my-24 w-full max-w-6xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Everything you need to stay organized and productive
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <img
                  src={TaskManagementSvg}
                  alt="Task Management"
                  className="w-12 h-12 mb-4"
                />
              ),
              title: "Effortless Task Management",
              description:
                "Add, edit, and organize tasks with intuitive drag-and-drop functionality. Set due dates, reminders, and categories to keep everything in order.",
            },
            {
              icon: (
                <img
                  src={ProductivitySvg}
                  alt="Productivity"
                  className="w-12 h-12 mb-4"
                />
              ),
              title: "Smart Prioritization",
              description:
                "Our AI-powered system helps you focus on what matters most. Visual priority indicators keep you on track with your most important work.",
            },
            {
              icon: <img src={SyncSvg} alt="Sync" className="w-12 h-12 mb-4" />,
              title: "Seamless Syncing",
              description:
                "Access your tasks anywhere, anytime. Real-time sync across all your devices means you're always up to date.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white/5 backdrop-blur-sm border border-neutral-200/30 dark:border-neutral-700/30 hover:border-neutral-400/30 dark:hover:border-neutral-400/30 transition-all">
                <CardHeader className="items-center">
                  {feature.icon}
                  <CardTitle className="text-xl text-neutral-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Productivity Stats Section */}
      <div className="relative my-24 w-full max-w-6xl z-10 bg-gradient-to-r from-green-400/10 to-green-500/10 dark:from-green-900/20 dark:to-green-900/20 rounded-3xl p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { value: "3.5x", label: "More productive" },
            { value: "89%", label: "Tasks completed" },
            { value: "2.1h", label: "Daily time saved" },
            { value: "98%", label: "User satisfaction" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-4"
            >
              <div className="text-3xl md:text-4xl font-bold text-neutral-600 dark:text-neutral-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* How It Works Section */}
      <div className="relative my-24 w-full max-w-6xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Simple Yet Powerful
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Get started in minutes and experience the difference
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Sign Up in Seconds",
              description:
                "Create your account with email or social login. No credit card required.",
              icon: (
                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900/50 flex items-center justify-center text-neutral-600 dark:text-neutral-400 font-bold">
                  1
                </div>
              ),
            },
            {
              step: "2",
              title: "Add Your Tasks",
              description:
                "Quickly input your to-dos or import from other apps. Organize with projects and tags.",
              icon: (
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
                  2
                </div>
              ),
            },
            {
              step: "3",
              title: "Achieve Your Goals",
              description:
                "Track progress, get reminders, and celebrate your accomplishments.",
              icon: (
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                  3
                </div>
              ),
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative my-24 w-full max-w-6xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Loved by Thousands
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Join our community of productive achievers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              quote:
                "RexTodo transformed how I manage my workload. What used to be chaos is now an organized system that helps me focus on my priorities.",
              author: "Sarah K., Project Manager",
              role: "Tech Industry",
            },
            {
              quote:
                "As a student juggling multiple deadlines, RexTodo has been a game-changer. The reminder system alone has saved me countless times.",
              author: "Michael T., Graduate Student",
              role: "Computer Science",
            },
            {
              quote:
                "Our team adopted RexTodo and saw immediate improvements in task completion rates. The collaboration features are excellent.",
              author: "David L., Team Lead",
              role: "Marketing Agency",
            },
            {
              quote:
                "I've tried dozens of todo apps, but RexTodo's simplicity combined with powerful features makes it my permanent choice.",
              author: "Emma R., Freelancer",
              role: "Graphic Design",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white/5 backdrop-blur-sm border border-neutral-200/30 dark:border-neutral-700/30 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center text-white font-bold">
                        {testimonial.author.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <p className="italic text-neutral-700 dark:text-neutral-300">
                        "{testimonial.quote}"
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start px-6 pb-6 pt-0">
                  <p className="font-medium text-neutral-900 dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {testimonial.role}
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="relative my-24 w-full max-w-6xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Choose the plan that works for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Starter",
              price: "Free",
              description: "Perfect for individuals getting started",
              features: [
                "Up to 5 projects",
                "Basic task management",
                "1 device sync",
                "Community support",
              ],
              cta: "Get Started",
            },
            {
              name: "Pro",
              price: "$9",
              period: "/month",
              description: "For power users and small teams",
              features: [
                "Unlimited projects",
                "Advanced features",
                "5 device sync",
                "Priority support",
                "Collaboration tools",
              ],
              popular: true,
              cta: "Go Pro",
            },
            {
              name: "Enterprise",
              price: "Custom",
              description: "For organizations with advanced needs",
              features: [
                "Everything in Pro",
                "Unlimited team members",
                "Dedicated account manager",
                "Custom integrations",
                "On-premise options",
              ],
              cta: "Contact Sales",
            },
          ].map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`h-full border-2 ${
                  plan.popular
                    ? "border-neutral-400 dark:border-neutral-600"
                    : "border-neutral-200/30 dark:border-neutral-700/30"
                } transition-all`}
              >
                {plan.popular && (
                  <div className="bg-neutral-500 text-white text-xs font-bold uppercase tracking-wide text-center py-1 px-2 rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader
                  className={`${plan.popular ? "pt-6" : "pt-8"} pb-4`}
                >
                  <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {plan.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-neutral-900 dark:text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    {plan.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg
                          className="w-5 h-5 text-neutral-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-neutral-700 dark:text-neutral-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full py-4 text-lg rounded-xl ${
                      plan.popular
                        ? "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-400 hover:to-green-700"
                        : "bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative my-24 w-full max-w-4xl z-10"
      >
        <div className="bg-gradient-to-r from-green-600 dark:from-green-900 to-green-700 rounded-3xl p-8 md:p-12 text-center">
          <img
            src={TrophySvg}
            alt="Trophy"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Boost Your Productivity?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are achieving more with RexTodo.
          </p>
          <SignedOut>
            <NavLink to="/sign-in">
              <Button className="px-8 py-4 text-lg rounded-xl shadow-lg bg-white text-neutral-600 hover:bg-neutral-100">
                Start Free Trial
              </Button>
            </NavLink>
          </SignedOut>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <div className="relative my-24 w-full max-w-4xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Everything you need to know about RexTodo
          </p>
        </motion.div>

        <div className="space-y-4">
          {[
            {
              question: "Is there a free version available?",
              answer:
                "Yes! RexTodo offers a free plan with all the basic features you need to get started with task management.",
            },
            {
              question: "Can I use RexTodo with my team?",
              answer:
                "Absolutely. Our Pro and Enterprise plans include collaboration features that make team task management seamless.",
            },
            {
              question: "How secure is my data with RexTodo?",
              answer:
                "We take security seriously. All data is encrypted in transit and at rest, and we regularly undergo security audits.",
            },
            {
              question: "What platforms does RexTodo support?",
              answer:
                "RexTodo is available on web, iOS, and Android. We also offer browser extensions for quick access.",
            },
            {
              question: "Can I import data from other task managers?",
              answer:
                "Yes, we support imports from most popular task management apps. Our support team can help with migration if needed.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border border-neutral-200/30 dark:border-neutral-700/30 hover:shadow-lg transition-all">
                <CardHeader className="pb-0">
                  <CardTitle className="text-lg text-neutral-900 dark:text-white">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative w-full max-w-6xl mt-24 z-10">
        <Separator className="w-full bg-neutral-500/30 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
              RexTodo
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              The ultimate task management solution for individuals and teams.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-400"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-400"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-400"
                >
                  Integrations
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-400"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-400"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-400"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-400"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-400"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-400"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="w-full bg-neutral-500/30 mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} RexTodo. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-400"
              aria-label="Twitter"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11 off_irs_roid fsdfsd fsdfsd fsdfsd fsdfsd fsdfsd fsdfsd fsdfsd fsdfsd fsdfsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdefsd fsdef11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a
              href="#"
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-400"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default HomeNoLoggedIn;
