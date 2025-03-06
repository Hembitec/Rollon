import React, { useState } from "react";
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
} from "lucide-react";
import { format } from "date-fns";

interface Quiz {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  difficulty: "easy" | "medium" | "hard";
  format: string;
  createdAt: Date;
  lastAttempted?: Date;
  score?: number;
}

const SavedQuizzes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Mock data for saved quizzes
  const mockQuizzes: Quiz[] = [
    {
      id: "1",
      title: "Introduction to React Hooks",
      description: "Learn the basics of React Hooks and their usage patterns",
      questionCount: 15,
      difficulty: "medium",
      format: "multiple-choice",
      createdAt: new Date(2023, 5, 15),
      lastAttempted: new Date(2023, 5, 20),
      score: 85,
    },
    {
      id: "2",
      title: "Advanced JavaScript Concepts",
      description:
        "Test your knowledge of closures, prototypes, and async programming",
      questionCount: 20,
      difficulty: "hard",
      format: "multiple-choice",
      createdAt: new Date(2023, 4, 10),
      lastAttempted: new Date(2023, 4, 12),
      score: 72,
    },
    {
      id: "3",
      title: "CSS Grid and Flexbox",
      description: "Modern CSS layout techniques explained",
      questionCount: 10,
      difficulty: "easy",
      format: "true-false",
      createdAt: new Date(2023, 3, 5),
    },
    {
      id: "4",
      title: "TypeScript Fundamentals",
      description: "Core concepts of TypeScript for JavaScript developers",
      questionCount: 25,
      difficulty: "medium",
      format: "short-answer",
      createdAt: new Date(2023, 2, 20),
      lastAttempted: new Date(2023, 2, 25),
      score: 90,
    },
  ];

  const filteredQuizzes = mockQuizzes
    .filter((quiz) => {
      // Filter by search term
      if (
        searchTerm &&
        !quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Filter by tab
      if (activeTab === "completed" && !quiz.lastAttempted) {
        return false;
      }
      if (activeTab === "not-attempted" && quiz.lastAttempted) {
        return false;
      }

      return true;
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Saved Quizzes</h1>
          <p className="text-gray-500">Access and manage your saved quizzes</p>
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

        <div className="divide-y divide-gray-200">
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-lg">{quiz.title}</h3>
                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">
                      {quiz.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <span className="font-medium mr-1">
                          {quiz.questionCount}
                        </span>{" "}
                        questions
                      </div>
                      <div className="flex items-center">
                        <span className="capitalize">{quiz.format}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {format(quiz.createdAt, "MMM d, yyyy")}
                      </div>
                      {quiz.lastAttempted && (
                        <>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Last attempt:{" "}
                            {format(quiz.lastAttempted, "MMM d, yyyy")}
                          </div>
                          <div className="flex items-center font-medium text-primary">
                            Score: {quiz.score}%
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" /> Take Quiz
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" /> Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
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
              <p className="text-gray-500">
                No quizzes found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedQuizzes;
