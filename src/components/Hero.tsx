import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const Hero = ({
  title = "Transform Learning Materials into Personalized Quizzes",
  subtitle = "Upload text, paste content, or provide links and let our AI generate tailored quiz questions to enhance your learning experience.",
  ctaText = "Create a Quiz",
  onCtaClick = () => {},
}: HeroProps) => {
  return (
    <section
      id="hero"
      className="w-full bg-gradient-to-b from-primary/5 to-background min-h-[90vh] flex items-center py-16 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Text content */}
        <motion.div
          className="text-center max-w-3xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            {title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={onCtaClick}
              className="text-lg px-8 py-6 h-auto bg-primary hover:bg-primary/90 text-white"
            >
              {ctaText}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-lg px-8 py-6 h-auto border-primary text-primary hover:bg-primary/5"
            >
              Learn More
            </Button>
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            New to Rollon?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Create an account
            </Link>{" "}
            or{" "}
            <Link to="/login" className="text-primary hover:underline">
              sign in
            </Link>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-success/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Scroll to explore
          </p>
          <ArrowDown className="h-5 w-5 text-primary" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
