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
import { Input } from "./ui/input";
import { FileText, MessageSquare, Loader2, X } from "lucide-react";
import FileUpload from "./FileUpload";

const ChatPDF = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { role: string; content: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (file: File) => {
    setPdfFile(file);
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

  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Chat with PDF</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Upload a PDF document and ask questions about its content. Get
          instant, accurate answers based on the document.
        </p>

        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-white dark:bg-[#1E1E1E] shadow-md">
            <CardHeader className="pb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4">
                  <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <CardTitle>Document Chat</CardTitle>
                  <CardDescription>
                    Upload a PDF and start asking questions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {!pdfFile ? (
                <div className="mb-6">
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    acceptedFileTypes={[".pdf"]}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 bg-primary/10 rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-primary mr-2" />
                      <span className="text-sm font-medium">
                        {pdfFile.name}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPdfFile(null)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="border rounded-md p-4 h-[400px] overflow-y-auto">
                    {chatHistory.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                        <MessageSquare className="h-12 w-12 mb-3 opacity-50" />
                        <p className="text-lg font-medium mb-1">
                          Start a conversation
                        </p>
                        <p className="text-sm">
                          Ask questions about your PDF document
                        </p>
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
            </CardContent>
            {chatHistory.length > 0 && (
              <CardFooter>
                <Button variant="outline" size="sm" onClick={clearChat}>
                  Clear Chat
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatPDF;
