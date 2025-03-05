import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

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
    <div className="w-full bg-gradient-to-b from-blue-50 to-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left side - Text content */}
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">{subtitle}</p>
          <div className="pt-4">
            <Button
              size="lg"
              onClick={onCtaClick}
              className="text-lg px-8 py-6 h-auto"
            >
              {ctaText}
            </Button>
          </div>
        </motion.div>

        {/* Right side - Illustration */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-full max-w-lg">
            {/* Main illustration */}
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
                alt="AI Quiz Generation"
                className="rounded-lg shadow-xl"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

            {/* Floating quiz cards */}
            <motion.div
              className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg z-20"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <p className="font-medium">Multiple Choice</p>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-6 bg-white p-4 rounded-lg shadow-lg z-20"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <p className="font-medium">True/False</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
