import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Progress } from "./ui/progress";
import { Label } from "./ui/label";
import { CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

const TestPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Get questions from localStorage or use mock data
  const getQuestions = (): Question[] => {
    const savedQuiz = localStorage.getItem("generatedQuiz");
    if (savedQuiz) {
      try {
        const parsedQuiz = JSON.parse(savedQuiz);
        if (Array.isArray(parsedQuiz)) {
          return parsedQuiz.map((q, index) => ({
            id: `q${index + 1}`,
            text: q.question,
            options: q.options || ["True", "False"],
            correctAnswer: q.correctAnswer,
          }));
        }
      } catch (e) {
        console.error("Error parsing saved quiz:", e);
      }
    }

    // Fallback to mock data
    return [
      {
        id: "q1",
        text: "What is a React Hook?",
        options: [
          "A physical hook for your computer",
          "A function that lets you use state and other React features without writing a class",
          "A third-party library for React",
          "A design pattern for CSS",
        ],
        correctAnswer:
          "A function that lets you use state and other React features without writing a class",
      },
      {
        id: "q2",
        text: "Which of the following is NOT a built-in React Hook?",
        options: ["useState", "useEffect", "useContext", "useHistory"],
        correctAnswer: "useHistory",
      },
      {
        id: "q3",
        text: "What does JSX stand for?",
        options: [
          "JavaScript XML",
          "JavaScript Extension",
          "JavaScript Syntax",
          "Java Syntax Extension",
        ],
        correctAnswer: "JavaScript XML",
      },
      {
        id: "q4",
        text: "Which lifecycle method is called after a component renders?",
        options: [
          "componentDidMount",
          "componentWillMount",
          "componentWillUpdate",
          "componentWillUnmount",
        ],
        correctAnswer: "componentDidMount",
      },
      {
        id: "q5",
        text: "What is the virtual DOM in React?",
        options: [
          "A direct copy of the real DOM",
          "A lightweight copy of the real DOM that React uses for performance optimization",
          "A browser extension for React developers",
          "A third-party library for DOM manipulation",
        ],
        correctAnswer:
          "A lightweight copy of the real DOM that React uses for performance optimization",
      },
    ];
  };

  const questions = getQuestions();

  // Format time remaining as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Calculate progress percentage
  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questions[currentQuestionIndex].id]: answer,
    });
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
      setIsTimerRunning(false);
    }
  };

  // Navigate to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Calculate results
  const calculateResults = () => {
    let correctCount = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    return {
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      score: Math.round((correctCount / questions.length) * 100),
    };
  };

  // Restart quiz
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setTimeRemaining(600);
    setIsTimerRunning(true);
  };

  // Current question
  const currentQuestion = questions[currentQuestionIndex];
  const isAnswered = selectedAnswers[currentQuestion.id] !== undefined;

  // Results
  const results = calculateResults();

  return (
    <div className="container mx-auto py-8 px-4">
      {!showResults ? (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 dark:text-[#E0E0E0]">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">React Fundamentals Quiz</h1>
              <p className="text-gray-500 dark:text-[#B0B0B0]">
                Test your knowledge of React core concepts
              </p>
            </div>
            <div className="flex items-center bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 px-3 py-2 rounded-md">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-medium">{formatTime(timeRemaining)}</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span>{Math.round(progressPercentage)}% complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <Card className="mb-6 dark:bg-[#1E1E1E] dark:border-gray-700 transition-colors duration-200">
            <CardHeader>
              <CardTitle className="text-xl">{currentQuestion.text}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAnswers[currentQuestion.id] || ""}
                onValueChange={handleAnswerSelect}
              >
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 mb-4 last:mb-0"
                  >
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="cursor-pointer leading-normal mt-0"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              <Button onClick={handleNextQuestion} disabled={!isAnswered}>
                {currentQuestionIndex === questions.length - 1
                  ? "Finish"
                  : "Next"}
              </Button>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, index) => (
              <Button
                key={q.id}
                variant={index === currentQuestionIndex ? "default" : "outline"}
                className={`h-10 w-10 p-0 ${selectedAnswers[q.id] ? "bg-primary/10 border-primary" : ""}`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 dark:text-[#E0E0E0]">
          <Card className="dark:bg-[#1E1E1E] dark:border-gray-700 transition-colors duration-200">
            <CardHeader>
              <CardTitle className="text-2xl">Quiz Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-primary/10 mb-4">
                  <span className="text-3xl font-bold text-primary">
                    {results.score}%
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-1">
                  {results.score >= 70 ? "Great job!" : "Keep practicing!"}
                </h3>
                <p className="text-gray-500 dark:text-[#B0B0B0]">
                  You answered {results.correctAnswers} out of{" "}
                  {results.totalQuestions} questions correctly
                </p>
              </div>

              <div className="space-y-4">
                {questions.map((question, index) => {
                  const isCorrect =
                    selectedAnswers[question.id] === question.correctAnswer;
                  return (
                    <div
                      key={question.id}
                      className={`p-4 rounded-lg ${isCorrect ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}
                    >
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          {isCorrect ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">
                            {index + 1}. {question.text}
                          </h4>
                          <div className="text-sm">
                            <p className="mb-1">
                              <span className="font-medium">Your answer: </span>
                              {selectedAnswers[question.id] || "Not answered"}
                            </p>
                            {!isCorrect && (
                              <p className="text-green-700 dark:text-green-400">
                                <span className="font-medium">
                                  Correct answer:{" "}
                                </span>
                                {question.correctAnswer}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleRestartQuiz}>
                Restart Quiz
              </Button>
              <Button>Save Results</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TestPage;
