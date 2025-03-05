import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import QuizCreator from "./QuizCreator";
import Features from "./Features";
import Footer from "./Footer";

const Home = () => {
  const scrollToQuizCreator = () => {
    const quizCreatorElement = document.getElementById("quiz-creator");
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
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-[70px]">
        {" "}
        {/* Offset for fixed navbar */}
        <Hero onCtaClick={scrollToQuizCreator} />
        <div
          id="quiz-creator"
          className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
        >
          <QuizCreator onQuizGenerate={handleQuizGenerate} />
        </div>
        <Features />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
