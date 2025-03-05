import React from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleCreateQuiz = () => {
    navigate("/create");
  };

  return (
    <div>
      <Hero onCtaClick={handleCreateQuiz} />
      <Features />
    </div>
  );
};

export default HomePage;
