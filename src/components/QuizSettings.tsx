import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import {
  Brain,
  Clock,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Globe,
  MessageSquare,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

interface QuizSettingsProps {
  difficulty?: "easy" | "medium" | "hard";
  questionFormat?: "multiple-choice" | "true-false" | "short-answer";
  quizLength?: number;
  onSettingsChange?: (settings: {
    difficulty: string;
    questionFormat: string;
    quizLength: number;
    language?: string;
    customInstructions?: string;
  }) => void;
}

const QuizSettings = ({
  difficulty = "medium",
  questionFormat = "multiple-choice",
  quizLength = 10,
  onSettingsChange = () => {},
}: QuizSettingsProps) => {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>(difficulty);
  const [selectedFormat, setSelectedFormat] = useState<string>(questionFormat);
  const [selectedLength, setSelectedLength] = useState<string>(
    quizLength.toString(),
  );
  const [language, setLanguage] = useState<string>("english");
  const [customInstructions, setCustomInstructions] = useState<string>("");
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const handleDifficultyChange = (value: string) => {
    setSelectedDifficulty(value);
    updateSettings(
      value,
      selectedFormat,
      parseInt(selectedLength),
      language,
      customInstructions,
    );
  };

  const handleFormatChange = (value: string) => {
    setSelectedFormat(value);
    updateSettings(
      selectedDifficulty,
      value,
      parseInt(selectedLength),
      language,
      customInstructions,
    );
  };

  const handleLengthChange = (value: string) => {
    setSelectedLength(value);
    updateSettings(
      selectedDifficulty,
      selectedFormat,
      parseInt(value),
      language,
      customInstructions,
    );
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    updateSettings(
      selectedDifficulty,
      selectedFormat,
      parseInt(selectedLength),
      value,
      customInstructions,
    );
  };

  const handleCustomInstructionsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCustomInstructions(e.target.value);
    updateSettings(
      selectedDifficulty,
      selectedFormat,
      parseInt(selectedLength),
      language,
      e.target.value,
    );
  };

  const updateSettings = (
    difficulty: string,
    format: string,
    length: number,
    lang?: string,
    instructions?: string,
  ) => {
    onSettingsChange({
      difficulty,
      questionFormat: format,
      quizLength: length,
      language: lang,
      customInstructions: instructions,
    });
  };

  const resetSettings = () => {
    setSelectedDifficulty("medium");
    setSelectedFormat("multiple-choice");
    setSelectedLength("10");
    setLanguage("english");
    setCustomInstructions("");
    updateSettings("medium", "multiple-choice", 10, "english", "");
  };

  return (
    <div className="w-full p-6 bg-white dark:bg-[#1E1E1E] rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
      <h3 className="text-lg font-semibold mb-4 flex items-center dark:text-white">
        <span>Quiz Settings</span>
        <HelpCircle className="ml-2 h-4 w-4 text-gray-400" />
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Difficulty Level */}
        <div className="space-y-3">
          <div className="flex items-center">
            <Brain className="h-5 w-5 text-blue-500 mr-2" />
            <h4 className="font-medium text-sm dark:text-gray-200">
              Difficulty Level
            </h4>
          </div>
          <Select
            value={selectedDifficulty}
            onValueChange={handleDifficultyChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Question Format */}
        <div className="space-y-3">
          <div className="flex items-center">
            <HelpCircle className="h-5 w-5 text-purple-500 mr-2" />
            <h4 className="font-medium text-sm dark:text-gray-200">
              Question Format
            </h4>
          </div>
          <Select value={selectedFormat} onValueChange={handleFormatChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
              <SelectItem value="true-false">True/False</SelectItem>
              <SelectItem value="short-answer">Short Answer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quiz Length */}
        <div className="space-y-3">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-green-500 mr-2" />
            <h4 className="font-medium text-sm dark:text-gray-200">
              Quiz Length
            </h4>
          </div>
          <Select value={selectedLength} onValueChange={handleLengthChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select number of questions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 questions</SelectItem>
              <SelectItem value="10">10 questions</SelectItem>
              <SelectItem value="15">15 questions</SelectItem>
              <SelectItem value="20">20 questions</SelectItem>
              <SelectItem value="25">25 questions</SelectItem>
              <SelectItem value="30">30 questions</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Advanced Settings */}
      <Collapsible
        open={showAdvanced}
        onOpenChange={setShowAdvanced}
        className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-full justify-between p-0 h-auto"
          >
            <span className="font-medium text-sm flex items-center">
              Advanced Settings
            </span>
            {showAdvanced ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Language */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-indigo-500 mr-2" />
                <h4 className="font-medium text-sm dark:text-gray-200">
                  Language
                </h4>
              </div>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="chinese">Chinese</SelectItem>
                  <SelectItem value="japanese">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Custom Instructions */}
            <div className="space-y-3">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 text-rose-500 mr-2" />
                <h4 className="font-medium text-sm dark:text-gray-200">
                  Custom Instructions
                </h4>
              </div>
              <textarea
                className="w-full min-h-[80px] rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2C2C2C] px-3 py-2 text-sm dark:text-gray-200 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="Add specific instructions for quiz generation..."
                value={customInstructions}
                onChange={handleCustomInstructionsChange}
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="mt-6 flex justify-end">
        <Button variant="outline" className="mr-2" onClick={resetSettings}>
          Reset
        </Button>
        <Button>Apply Settings</Button>
      </div>
    </div>
  );
};

export default QuizSettings;
