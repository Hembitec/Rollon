import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sparkles, Save } from "lucide-react";
import InputMethodSelector from "./InputMethodSelector";
import TextInput from "./TextInput";
import FileUpload from "./FileUpload";
import UrlInput from "./UrlInput";
import QuizSettings from "./QuizSettings";
import SaveQuizDialog from "./SaveQuizDialog";
import { useNavigate } from "react-router-dom";

interface QuizCreatorProps {
  onQuizGenerate?: (data: {
    content: string;
    settings: {
      difficulty: string;
      questionFormat: string;
      quizLength: number;
    };
  }) => void;
}

const QuizCreator = ({ onQuizGenerate = () => {} }: QuizCreatorProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("text");
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [urlPreview, setUrlPreview] = useState<string | null>(null);
  const [quizGenerated, setQuizGenerated] = useState<boolean>(false);
  const [quizSettings, setQuizSettings] = useState({
    difficulty: "medium",
    questionFormat: "multiple-choice",
    quizLength: 10,
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setError(null);
  };

  const handleTextSubmit = (text: string) => {
    setContent(text);
    setError(null);
  };

  const handleFileSelect = (file: File) => {
    // In a real implementation, this would process the file
    // and extract its content
    setContent(`Content from file: ${file.name}`);
    setError(null);
  };

  const handleUrlSubmit = (url: string) => {
    setIsLoading(true);
    setError(null);

    // Simulate URL content extraction
    setTimeout(() => {
      setIsLoading(false);
      // Simulate success
      if (url.includes("example")) {
        const mockContent =
          "This is extracted content from the URL. In a real implementation, this would be the actual content scraped from the provided URL.";
        setContent(mockContent);
        setUrlPreview(mockContent);
      } else {
        // Simulate error
        setError(
          "Could not extract content from this URL. Please check if the content is publicly accessible.",
        );
      }
    }, 1500);
  };

  const handleSettingsChange = (settings: {
    difficulty: string;
    questionFormat: string;
    quizLength: number;
  }) => {
    setQuizSettings(settings);
  };

  const handleGenerateQuiz = () => {
    if (!content) {
      setError("Please provide content for your quiz.");
      return;
    }

    setIsLoading(true);

    // Simulate quiz generation
    setTimeout(() => {
      setIsLoading(false);
      setQuizGenerated(true);

      onQuizGenerate({
        content,
        settings: quizSettings,
      });
    }, 2000);
  };

  const handleSaveQuiz = (data: { title: string; description: string }) => {
    // In a real implementation, this would save to a database
    console.log("Saving quiz:", {
      title: data.title,
      description: data.description,
      content,
      settings: quizSettings,
    });

    // Navigate to saved quizzes page
    navigate("/saved");
  };

  const handleTakeQuiz = () => {
    // Navigate to the test page
    navigate("/test");
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Create Your Quiz
        </h2>
        <p className="text-gray-600">
          Provide your learning material and customize your quiz settings
        </p>
      </div>

      <div className="p-6">
        {!quizGenerated ? (
          <>
            <InputMethodSelector
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full mt-4"
            >
              <TabsContent value="text" className="mt-0">
                <TextInput onTextSubmit={handleTextSubmit} />
              </TabsContent>

              <TabsContent value="file" className="mt-0">
                <FileUpload onFileSelect={handleFileSelect} />
              </TabsContent>

              <TabsContent value="url" className="mt-0">
                <UrlInput
                  onUrlSubmit={handleUrlSubmit}
                  isLoading={isLoading}
                  error={error}
                  previewContent={urlPreview}
                />
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <QuizSettings
                difficulty={quizSettings.difficulty}
                questionFormat={quizSettings.questionFormat}
                quizLength={quizSettings.quizLength}
                onSettingsChange={handleSettingsChange}
              />
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <Button
                onClick={handleGenerateQuiz}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2"
                disabled={isLoading || !content}
              >
                {isLoading ? (
                  "Generating..."
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Quiz
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="py-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-4">
                <Sparkles className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Quiz Generated Successfully!
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Your quiz with {quizSettings.quizLength}{" "}
                {quizSettings.questionFormat} questions has been created.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <SaveQuizDialog
                trigger={
                  <Button variant="outline" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save for Later
                  </Button>
                }
                onSave={handleSaveQuiz}
                defaultTitle={`Quiz on ${activeTab === "file" ? "Uploaded Document" : activeTab === "url" ? "Web Content" : "Text Input"}`}
              />

              <Button onClick={handleTakeQuiz}>Take Quiz Now</Button>
            </div>

            <div className="mt-8 text-center">
              <Button
                variant="link"
                onClick={() => setQuizGenerated(false)}
                className="text-gray-500"
              >
                Create Another Quiz
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCreator;
