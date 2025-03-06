import React from "react";
import QuizCreator from "@/components/QuizCreator";

const CreateQuizPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
        Create a New Quiz
      </h1>
      <QuizCreator />
    </div>
  );
};

export default CreateQuizPage;
