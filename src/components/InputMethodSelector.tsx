import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, Link } from "lucide-react";

interface InputMethodSelectorProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const InputMethodSelector = ({
  activeTab = "text",
  onTabChange = () => {},
}: InputMethodSelectorProps) => {
  const handleTabChange = (value: string) => {
    onTabChange(value);
  };

  return (
    <div className="w-full bg-white dark:bg-[#1E1E1E] p-3 rounded-t-lg border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <Tabs
        defaultValue={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="w-full flex justify-center mb-2">
          <TabsTrigger value="text" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Text Input</span>
          </TabsTrigger>
          <TabsTrigger value="file" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            <span>File Upload</span>
          </TabsTrigger>
          <TabsTrigger value="url" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            <span>URL</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Select an input method to create your quiz
      </p>
    </div>
  );
};

export default InputMethodSelector;
