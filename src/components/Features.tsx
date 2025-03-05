import React from "react";
import { cn } from "@/lib/utils";
import { Brain, Zap, BookOpen, Clock, Users, Share2 } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = ({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow",
        className,
      )}
    >
      <div className="flex flex-col items-start">
        <div className="p-3 rounded-full bg-primary/10 mb-4">{icon}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

interface FeaturesProps {
  className?: string;
  features?: FeatureCardProps[];
}

const Features = ({
  className,
  features = [
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: "AI-Powered Quiz Generation",
      description:
        "Our advanced AI analyzes your content and creates relevant, contextual questions tailored to your learning needs.",
    },
    {
      icon: <Zap className="h-6 w-6 text-amber-500" />,
      title: "Multiple Input Methods",
      description:
        "Upload files, paste text, or provide URLs - we support various ways to import your learning materials.",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-green-500" />,
      title: "Customizable Quizzes",
      description:
        "Choose difficulty levels, question formats, and quiz length to match your learning style and goals.",
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-500" />,
      title: "Save Time",
      description:
        "Create comprehensive quizzes in seconds instead of spending hours manually crafting questions.",
    },
    {
      icon: <Users className="h-6 w-6 text-purple-500" />,
      title: "Track Progress",
      description:
        "Monitor your learning journey with detailed performance analytics and improvement suggestions.",
    },
    {
      icon: <Share2 className="h-6 w-6 text-rose-500" />,
      title: "Share & Collaborate",
      description:
        "Export quizzes as PDFs or share them via links to collaborate with classmates or study groups.",
    },
  ],
}: FeaturesProps) => {
  return (
    <section className={cn("py-16 bg-gray-50", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Rollon?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform transforms how you learn and test your
            knowledge with these powerful features
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
