import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import QuizCreator from "./QuizCreator";
import Features from "./Features";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, MessageSquare, Users, Zap } from "lucide-react";
import { Button } from "./ui/button";

const Home = () => {
  const scrollToQuizCreator = () => {
    const quizCreatorElement = document.getElementById("demo");
    if (quizCreatorElement) {
      quizCreatorElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleQuizGenerate = (data: {
    content: string;
    settings: {
      difficulty: string;
      questionFormat: string;
      quizLength: number;
    };
  }) => {
    // This would be implemented to handle the quiz generation
    console.log("Generating quiz with:", data);
    // In a real implementation, this would call an API to generate the quiz
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[70px]">
        {/* Hero Section */}
        <Hero onCtaClick={scrollToQuizCreator} />

        {/* Features Section */}
        <section
          id="features"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#121212]"
        >
          <Features />
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#1A1A1A]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How Rollon Works</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our simple 3-step process transforms your learning materials
                into personalized quizzes in seconds
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Input Your Content",
                  description:
                    "Upload a document, paste text, or provide a URL to educational content.",
                  icon: <BookOpen className="h-10 w-10 text-primary" />,
                },
                {
                  step: "2",
                  title: "Customize Your Quiz",
                  description:
                    "Select difficulty level, question format, and quiz length to match your learning needs.",
                  icon: <Sparkles className="h-10 w-10 text-secondary" />,
                },
                {
                  step: "3",
                  title: "Generate & Learn",
                  description:
                    "Our AI creates personalized questions, and you can take the quiz immediately or save it for later.",
                  icon: <Zap className="h-10 w-10 text-success" />,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-[#1E1E1E] p-8 rounded-lg shadow-md border border-gray-100 dark:border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    Step {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section
          id="demo"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#121212]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Try It Yourself</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Experience the power of AI-generated quizzes with our
                interactive demo
              </p>
            </div>

            <QuizCreator onQuizGenerate={handleQuizGenerate} />
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#1A1A1A]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Join thousands of students and educators who are transforming
                how they learn and teach
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "Rollon helped me ace my finals. Creating quizzes from my lecture notes was so easy, and it really helped me identify gaps in my knowledge.",
                  name: "Sarah J.",
                  title: "Computer Science Student",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
                },
                {
                  quote:
                    "As a teacher, I save hours of time creating assessments. The AI generates questions that perfectly match my lesson objectives.",
                  name: "Michael T.",
                  title: "High School Teacher",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
                },
                {
                  quote:
                    "The Chat with PDF feature is a game-changer for my research. I can ask questions about complex papers and get instant, accurate answers.",
                  name: "Priya K.",
                  title: "Graduate Researcher",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-[#1E1E1E] p-8 rounded-lg shadow-md border border-gray-100 dark:border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-6">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.title}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    "{item.quote}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="cta"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5 dark:bg-primary/10"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Learning Experience?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of students and educators who are already using
              Rollon to enhance their learning journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="text-lg px-8 py-6 h-auto bg-primary hover:bg-primary/90 text-white"
                onClick={() => (window.location.href = "/signup")}
              >
                Get Started for Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 h-auto border-primary text-primary hover:bg-primary/5"
                onClick={() =>
                  document
                    .getElementById("demo")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Try Demo
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
