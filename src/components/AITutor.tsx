import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Brain,
  BookOpen,
  FileText,
  Upload,
  Sparkles,
  MessageSquare,
  X,
  Loader2,
} from "lucide-react";
import FileUpload from "./FileUpload";

const AITutor = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [studyTopic, setStudyTopic] = useState("");
  const [studyType, setStudyType] = useState("flashcards");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { role: string; content: string }[]
  >([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleSolveQuestion = () => {
    if (!question) return;

    setIsLoading(true);
    setResult(null);

    // Simulate AI processing
    setTimeout(() => {
      setResult(
        `## Solution for your question\n\n${question}\n\n### Step 1:\nFirst, we need to understand the problem. This appears to be asking about ${question.split(" ").slice(0, 3).join(" ")}...\n\n### Step 2:\nLet's break this down into smaller parts...\n\n### Step 3:\nNow we can solve each part systematically...\n\n### Final Answer:\nBased on our analysis, the solution is...`,
      );
      setIsLoading(false);
    }, 2000);
  };

  const handleGenerateStudyMaterial = () => {
    if (!studyTopic) return;

    setIsLoading(true);
    setResult(null);

    // Simulate AI processing
    setTimeout(() => {
      let content = "";

      if (studyType === "flashcards") {
        content = `## Flashcards for ${studyTopic}\n\n1. **Front:** What is ${studyTopic}?\n   **Back:** ${studyTopic} is a fundamental concept in...\n\n2. **Front:** Key characteristics of ${studyTopic}\n   **Back:** The main characteristics include...\n\n3. **Front:** How does ${studyTopic} relate to other concepts?\n   **Back:** It connects with several other ideas including...`;
      } else if (studyType === "notes") {
        content = `# Study Notes: ${studyTopic}\n\n## Introduction\n${studyTopic} is an important concept that...\n\n## Key Points\n- First major aspect of ${studyTopic}\n- Second important consideration\n- Historical development\n- Modern applications\n\n## Relationships to Other Concepts\n${studyTopic} is closely related to several other areas including...\n\n## Common Misconceptions\nMany people misunderstand ${studyTopic} by thinking that...`;
      } else if (studyType === "summary") {
        content = `# Summary of ${studyTopic}\n\n${studyTopic} refers to the concept of... It was first developed by... and has since evolved to encompass... The main principles include... In modern contexts, it's applied to... The future of ${studyTopic} likely involves...`;
      }

      setResult(content);
      setIsLoading(false);
    }, 2000);
  };

  const handleChatWithPDF = () => {
    if (!chatMessage) return;

    setIsLoading(true);

    // Add user message to chat
    const newChatHistory = [
      ...chatHistory,
      { role: "user", content: chatMessage },
    ];
    setChatHistory(newChatHistory);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: "assistant",
        content: `Based on the PDF content, I can tell you that ${chatMessage.includes("?") ? "the answer to your question" : "regarding your statement"} about ${chatMessage.split(" ").slice(0, 3).join(" ")}... The document mentions several key points related to this topic on pages 12-15. Specifically, it states that...`,
      };

      setChatHistory([...newChatHistory, aiResponse]);
      setChatMessage("");
      setIsLoading(false);
    }, 1500);
  };

  const handleFileSelect = (file: File) => {
    setPdfFile(file);
  };

  const closeModal = () => {
    setActiveModal(null);
    setResult(null);
    setQuestion("");
    setStudyTopic("");
    setChatMessage("");
    setChatHistory([]);
    setPdfFile(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">AI Tutor</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Your personal AI-powered learning assistant. Get help with
          assignments, create study materials, or chat with your documents.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Assignment Solver Card */}
          <Card className="bg-white dark:bg-[#1E1E1E] hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Assignment Solver</CardTitle>
              <CardDescription>
                Get step-by-step solutions for your challenging problems
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-500 dark:text-gray-400">
              Upload a question or type it in, and our AI will break it down
              with detailed explanations.
            </CardContent>
            <CardFooter>
              <Dialog
                open={activeModal === "solver"}
                onOpenChange={(open) => !open && closeModal()}
              >
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setActiveModal("solver")}
                    className="w-full"
                  >
                    Solve a Problem
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Assignment Solver</DialogTitle>
                    <DialogDescription>
                      Enter your question or upload an image of the problem
                    </DialogDescription>
                  </DialogHeader>

                  <Tabs defaultValue="text" className="mt-4">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="text">Text Input</TabsTrigger>
                      <TabsTrigger value="upload">Upload</TabsTrigger>
                    </TabsList>
                    <TabsContent value="text" className="mt-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="question">Your Question</Label>
                          <Textarea
                            id="question"
                            placeholder="Type your question or problem here..."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="min-h-[150px]"
                          />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="upload" className="mt-4">
                      <FileUpload
                        onFileSelect={handleFileSelect}
                        acceptedFileTypes={[".jpg", ".jpeg", ".png", ".pdf"]}
                      />
                    </TabsContent>
                  </Tabs>

                  {result && (
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Sparkles className="h-4 w-4 mr-2 text-primary" />
                        Solution
                      </h3>
                      <div className="whitespace-pre-line text-sm">
                        {result}
                      </div>
                    </div>
                  )}

                  <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={closeModal}>
                      <X className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                    <Button
                      onClick={handleSolveQuestion}
                      disabled={isLoading || (!question && !pdfFile)}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Solving...
                        </>
                      ) : (
                        <>Solve Problem</>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          {/* Study Material Generator Card */}
          <Card className="bg-white dark:bg-[#1E1E1E] hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Study Material Generator</CardTitle>
              <CardDescription>
                Create flashcards, notes, and summaries instantly
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-500 dark:text-gray-400">
              Enter a topic or upload content to generate customized study
              materials that fit your learning style.
            </CardContent>
            <CardFooter>
              <Dialog
                open={activeModal === "study"}
                onOpenChange={(open) => !open && closeModal()}
              >
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setActiveModal("study")}
                    className="w-full"
                  >
                    Generate Materials
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Study Material Generator</DialogTitle>
                    <DialogDescription>
                      Create customized study materials from any topic or
                      content
                    </DialogDescription>
                  </DialogHeader>

                  <Tabs defaultValue="text" className="mt-4">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="text">Topic Input</TabsTrigger>
                      <TabsTrigger value="upload">Upload Content</TabsTrigger>
                    </TabsList>
                    <TabsContent value="text" className="mt-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="topic">Topic or Subject</Label>
                          <Input
                            id="topic"
                            placeholder="Enter a topic (e.g., Photosynthesis, World War II, Calculus)"
                            value={studyTopic}
                            onChange={(e) => setStudyTopic(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="type">Material Type</Label>
                          <select
                            id="type"
                            value={studyType}
                            onChange={(e) => setStudyType(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <option value="flashcards">Flashcards</option>
                            <option value="notes">Study Notes</option>
                            <option value="summary">
                              Summary & Key Points
                            </option>
                          </select>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="upload" className="mt-4">
                      <FileUpload
                        onFileSelect={handleFileSelect}
                        acceptedFileTypes={[".pdf", ".docx", ".txt"]}
                      />
                      {pdfFile && (
                        <div className="mt-4 space-y-2">
                          <Label htmlFor="type">Material Type</Label>
                          <select
                            id="type"
                            value={studyType}
                            onChange={(e) => setStudyType(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <option value="flashcards">Flashcards</option>
                            <option value="notes">Study Notes</option>
                            <option value="summary">
                              Summary & Key Points
                            </option>
                          </select>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>

                  {result && (
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Sparkles className="h-4 w-4 mr-2 text-primary" />
                        Generated Study Material
                      </h3>
                      <div className="whitespace-pre-line text-sm max-h-[300px] overflow-y-auto">
                        {result}
                      </div>
                    </div>
                  )}

                  <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={closeModal}>
                      <X className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                    <Button
                      onClick={handleGenerateStudyMaterial}
                      disabled={isLoading || (!studyTopic && !pdfFile)}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>Generate Material</>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          {/* Chat with PDF Card */}
          <Card className="bg-white dark:bg-[#1E1E1E] hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Chat with PDF</CardTitle>
              <CardDescription>
                Have conversations with your documents
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-500 dark:text-gray-400">
              Upload a PDF and ask questions about its content. Get instant,
              accurate answers based on the document.
            </CardContent>
            <CardFooter>
              <Dialog
                open={activeModal === "chat"}
                onOpenChange={(open) => !open && closeModal()}
              >
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setActiveModal("chat")}
                    className="w-full"
                  >
                    Start Chatting
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Chat with PDF</DialogTitle>
                    <DialogDescription>
                      Upload a PDF and ask questions about its content
                    </DialogDescription>
                  </DialogHeader>

                  {!pdfFile ? (
                    <div className="mt-4">
                      <FileUpload
                        onFileSelect={handleFileSelect}
                        acceptedFileTypes={[".pdf"]}
                      />
                    </div>
                  ) : (
                    <div className="mt-4 space-y-4">
                      <div className="p-2 bg-primary/10 rounded-md flex items-center">
                        <FileText className="h-5 w-5 text-primary mr-2" />
                        <span className="text-sm font-medium">
                          {pdfFile.name}
                        </span>
                      </div>

                      <div className="border rounded-md p-4 h-[300px] overflow-y-auto">
                        {chatHistory.length === 0 ? (
                          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                            <MessageSquare className="h-8 w-8 mb-2 opacity-50" />
                            <p>Ask a question about your PDF document</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {chatHistory.map((msg, index) => (
                              <div
                                key={index}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                              >
                                <div
                                  className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                                >
                                  {msg.content}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Input
                          placeholder="Ask a question about the document..."
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            !isLoading &&
                            chatMessage &&
                            handleChatWithPDF()
                          }
                        />
                        <Button
                          onClick={handleChatWithPDF}
                          disabled={isLoading || !chatMessage}
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MessageSquare className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={closeModal}>
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
