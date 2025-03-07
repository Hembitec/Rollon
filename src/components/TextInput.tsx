import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { AlertCircle, CheckCircle, FileText, BookOpen } from "lucide-react";

interface TextInputProps {
  onTextSubmit?: (text: string) => void;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
}

const TextInput = ({
  onTextSubmit = () => {},
  placeholder = "Enter a topic (e.g., 'React Hooks') or paste your learning material here...",
  maxLength = Infinity,
  minLength = 50,
}: TextInputProps) => {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = () => {
    // If text is very short (like a topic name), don't enforce minimum length
    if (text.length < minLength && text.length > 5) {
      // Check if it looks like a topic rather than content
      const wordCount = text.split(/\s+/).length;
      if (wordCount > 3) {
        setError(`Text must be at least ${minLength} characters long`);
        return;
      }
    }

    if (text.length > maxLength) {
      setError(`Text cannot exceed ${maxLength} characters`);
      return;
    }

    setSuccess(true);
    onTextSubmit(text);
  };

  const characterCount = text.length;
  const isOverLimit = characterCount > maxLength;
  const isUnderLimit = characterCount < minLength && characterCount > 0;

  return (
    <div className="w-full bg-white dark:bg-[#1E1E1E] p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="mb-3">
        <h3 className="text-base font-medium mb-1 dark:text-white flex items-center">
          <FileText className="h-5 w-5 mr-2 text-primary" />
          Text Input
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Enter a topic (e.g., "JavaScript") or paste your learning material
          below. We'll generate quiz questions based on this content.
        </p>
      </div>

      <Textarea
        value={text}
        onChange={handleTextChange}
        placeholder={placeholder}
        className={`min-h-[180px] mb-2 dark:bg-[#2C2C2C] dark:text-gray-200 dark:border-gray-700 dark:placeholder:text-gray-500 ${isOverLimit ? "border-red-500 focus-visible:ring-red-500" : ""} ${isUnderLimit ? "border-yellow-500 focus-visible:ring-yellow-500" : ""}`}
      />

      <div className="flex justify-between items-center mb-4">
        <div className="text-sm">
          <span
            className={`font-medium ${isOverLimit ? "text-red-500" : isUnderLimit ? "text-yellow-500" : "text-gray-500"}`}
          >
            {characterCount}
          </span>
          <span className="text-gray-500"> characters</span>
        </div>

        {error && (
          <div className="flex items-center text-red-500 text-sm">
            <AlertCircle className="h-4 w-4 mr-1" />
            {error}
          </div>
        )}

        {success && !error && (
          <div className="flex items-center text-green-500 text-sm">
            <CheckCircle className="h-4 w-4 mr-1" />
            Content ready for quiz generation
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={characterCount === 0 || isOverLimit}
          className="px-4 py-2"
        >
          Use This Text
        </Button>
      </div>
    </div>
  );
};

export default TextInput;
