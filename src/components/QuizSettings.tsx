import React, { useState } from "react";
import { Slider } from "./ui/slider";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Brain, Clock, HelpCircle } from "lucide-react";

interface QuizSettingsProps {
  difficulty?: "easy" | "medium" | "hard";
  questionFormat?: "multiple-choice" | "true-false" | "short-answer";
  quizLength?: number;
  onSettingsChange?: (settings: {
    difficulty: string;
    questionFormat: string;
    quizLength: number;
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
  const [selectedLength, setSelectedLength] = useState<number>(quizLength);

  const handleDifficultyChange = (value: string) => {
    setSelectedDifficulty(value);
    updateSettings(value, selectedFormat, selectedLength);
  };

  const handleFormatChange = (value: string) => {
    setSelectedFormat(value);
    updateSettings(selectedDifficulty, value, selectedLength);
  };

  const handleLengthChange = (value: number[]) => {
    setSelectedLength(value[0]);
    updateSettings(selectedDifficulty, selectedFormat, value[0]);
  };

  const updateSettings = (
    difficulty: string,
    format: string,
    length: number,
  ) => {
    onSettingsChange({
      difficulty,
      questionFormat: format,
      quizLength: length,
    });
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <span>Quiz Settings</span>
        <HelpCircle className="ml-2 h-4 w-4 text-gray-400" />
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Difficulty Level */}
        <div className="space-y-3">
          <div className="flex items-center">
            <Brain className="h-5 w-5 text-blue-500 mr-2" />
            <h4 className="font-medium text-sm">Difficulty Level</h4>
          </div>
          <RadioGroup
            value={selectedDifficulty}
            onValueChange={handleDifficultyChange}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="easy" id="easy" />
              <label htmlFor="easy" className="text-sm cursor-pointer">
                Easy
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <label htmlFor="medium" className="text-sm cursor-pointer">
                Medium
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hard" id="hard" />
              <label htmlFor="hard" className="text-sm cursor-pointer">
                Hard
              </label>
            </div>
          </RadioGroup>
        </div>

        {/* Question Format */}
        <div className="space-y-3">
          <div className="flex items-center">
            <HelpCircle className="h-5 w-5 text-purple-500 mr-2" />
            <h4 className="font-medium text-sm">Question Format</h4>
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
            <h4 className="font-medium text-sm">Quiz Length</h4>
          </div>
          <div className="space-y-4">
            <Slider
              value={[selectedLength]}
              onValueChange={handleLengthChange}
              min={5}
              max={30}
              step={5}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>5 questions</span>
              <span>{selectedLength} questions</span>
              <span>30 questions</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          variant="outline"
          className="mr-2"
          onClick={() => {
            setSelectedDifficulty("medium");
            setSelectedFormat("multiple-choice");
            setSelectedLength(10);
            updateSettings("medium", "multiple-choice", 10);
          }}
        >
          Reset
        </Button>
        <Button>Apply Settings</Button>
      </div>
    </div>
  );
};

export default QuizSettings;
