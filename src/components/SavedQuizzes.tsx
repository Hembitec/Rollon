import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import {
  Play,
  MoreVertical,
  Download,
  Trash,
  Edit,
  Clock,
  Calendar,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { getUserQuizzes, deleteQuiz, generateQuizPDF, Quiz } from "@/lib/quiz";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface ExtendedQuiz extends Quiz {
  lastAttempted?: string;
  score?: number;
  status?: "completed" | "in-progress" | "not-attempted";
}

const SavedQuizzes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [quizzes, setQuizzes] = useState<ExtendedQuiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch quizzes from Supabase
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        // Check if user is authenticated
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) {
          setError("You must be logged in to view saved quizzes");
          setIsLoading(false);
          return;
        }

        // Get quizzes from Supabase without trying to join quiz_results
        const { data: quizData, error: quizError } = await supabase
          .from("quizzes")
          .select("*")
          .eq("user_id", userData.user.id)
          .order("created_at", { ascending: false });

        if (quizError) throw quizError;

        // Transform the data to match our Quiz interface with additional fields
        const transformedQuizzes = quizData.map((item) => {
          // Determine quiz status based on last_attempted and last_score fields
          let status: "completed" | "in-progress" | "not-attempted" =
            "not-attempted";
          let lastAttempted = item.last_attempted || null;
          let score = item.last_score || null;

          // If there's a last attempt, determine status
          if (lastAttempted) {
            // If score is 100%, it's completed, otherwise in-progress
            status = score === 100 ? "completed" : "in-progress";
          }

          return {
            id: item.id,
            title: item.title,
            description: item.description,
            questions: item.questions,
            difficulty: item.difficulty,
            questionFormat: item.question_format,
            quizLength: item.quiz_length,
            createdAt: item.created_at,
            userId: item.user_id,
            content: item.content,
            lastAttempted,
            score,
            status,
          };
        });

        setQuizzes(transformedQuizzes);
      } catch (err: any) {
        console.error("Error fetching quizzes:", err);
        setError(err.message || "Failed to load quizzes. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // Handle quiz deletion
  const handleDeleteQuiz = async (quizId: string) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;

    try {
      await deleteQuiz(quizId);
      setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
    } catch (err: any) {
      console.error("Error deleting quiz:", err);
      alert("Failed to delete quiz. Please try again.");
    }
  };

  // Handle quiz download as PDF
  const handleDownloadQuiz = (quiz: Quiz) => {
    generateQuizPDF(quiz);
  };

  // Handle taking a quiz
  const handleTakeQuiz = (quiz: Quiz) => {
    // Store the quiz questions in localStorage
    localStorage.setItem("generatedQuiz", JSON.stringify(quiz.questions));
    // Also store the quiz ID for saving results
    localStorage.setItem("currentQuizId", quiz.id || "");
    navigate("/test");
  };

  const filteredQuizzes = quizzes
    .filter((quiz) => {
      // Filter by search term
      if (
        searchTerm &&
        !quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Filter by tab
      if (activeTab === "completed" && quiz.status !== "completed") {
        return false;
      }
      if (activeTab === "in-progress" && quiz.status !== "in-progress") {
        return false;
      }
      if (activeTab === "not-attempted" && quiz.status !== "not-attempted") {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sort by creation date (newest first)
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusBadge = (quiz: ExtendedQuiz) => {
    switch (quiz.status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Completed
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 flex items-center gap-1">
            <Clock className="h-3 w-3" /> {quiz.score}% Complete
          </Badge>
        );
      case "not-attempted":
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400 flex items-center gap-1">
            <XCircle className="h-3 w-3" /> Not Attempted
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Saved Quizzes</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Access and manage your saved quizzes
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between gap-4">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full md:w-auto"
          >
            <TabsList>
              <TabsTrigger value="all">All Quizzes</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="not-attempted">Not Attempted</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full md:w-64">
            <Input
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <Loader2 className="h-8 w-8 mx-auto mb-4 animate-spin text-primary" />
            <p className="text-gray-500 dark:text-gray-400">
              Loading your quizzes...
            </p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-500" />
            <p className="text-red-500 font-medium mb-2">Error</p>
            <p className="text-gray-500 dark:text-gray-400">{error}</p>
            {error.includes("logged in") && (
              <Button className="mt-4" onClick={() => navigate("/login")}>
                Go to Login
              </Button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredQuizzes.length > 0 ? (
              filteredQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-medium text-lg">{quiz.title}</h3>
                        <Badge className={getDifficultyColor(quiz.difficulty)}>
                          {quiz.difficulty}
                        </Badge>
                        {getStatusBadge(quiz)}
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                        {quiz.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <span className="font-medium mr-1">
                            {quiz.questions?.length || 0}
                          </span>{" "}
                          questions
                        </div>
                        <div className="flex items-center">
                          <span className="capitalize">
                            {quiz.questionFormat}
                          </span>
                        </div>
                        {quiz.createdAt && (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Created:{" "}
                            {format(new Date(quiz.createdAt), "MMM d, yyyy")}
                          </div>
                        )}
                        {quiz.lastAttempted && (
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Last attempt:{" "}
                            {format(
                              new Date(quiz.lastAttempted),
                              "MMM d, yyyy",
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTakeQuiz(quiz)}
                      >
                        <Play className="h-4 w-4 mr-2" /> Take Quiz
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleDownloadQuiz(quiz)}
                          >
                            <Download className="h-4 w-4 mr-2" /> Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 dark:text-red-400"
                            onClick={() => handleDeleteQuiz(quiz.id || "")}
                          >
                            <Trash className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {activeTab === "all"
                    ? "No quizzes found. Create your first quiz to get started!"
                    : `No ${activeTab} quizzes found.`}
                </p>
                <Button onClick={() => navigate("/create")}>
                  Create a Quiz
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedQuizzes;
