import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Globe, Link2, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface UrlInputProps {
  onUrlSubmit?: (url: string) => void;
  isLoading?: boolean;
  error?: string | null;
  previewContent?: string | null;
}

const UrlInput = ({
  onUrlSubmit = () => {},
  isLoading = false,
  error = null,
  previewContent = null,
}: UrlInputProps) => {
  const [url, setUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);

  const validateUrl = (input: string) => {
    // Basic URL validation
    try {
      new URL(input);
      setIsValidUrl(true);
      return true;
    } catch (e) {
      if (input.length > 0) {
        setIsValidUrl(false);
      } else {
        setIsValidUrl(true); // Empty input is not an error state
      }
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);
    validateUrl(inputUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateUrl(url)) {
      onUrlSubmit(url);
    }
  };

  return (
    <Card className="w-full bg-white dark:bg-[#1E1E1E] transition-colors duration-200 shadow-sm">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          URL
        </CardTitle>
        <CardDescription>
          Enter a URL to extract content for your quiz. The content must be
          publicly accessible.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="flex">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="https://example.com/article"
                  value={url}
                  onChange={handleUrlChange}
                  className={`pr-10 ${!isValidUrl ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  disabled={isLoading}
                />
                {!isValidUrl && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Please enter a valid URL</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
                {isValidUrl && url.length > 0 && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </div>
              <Button
                type="submit"
                className="ml-2"
                disabled={!isValidUrl || url.length === 0 || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading
                  </>
                ) : (
                  <>Extract</>
                )}
              </Button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {error}
              </p>
            )}
          </div>
        </form>

        {previewContent && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Link2 className="h-4 w-4 mr-1 text-blue-500" />
              Content Preview
            </h4>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm max-h-32 overflow-y-auto dark:text-gray-300">
              {previewContent}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500 px-4 py-3">
        <p>
          Supported content: Articles, blog posts, and other text-based web
          pages.
        </p>
      </CardFooter>
    </Card>
  );
};

export default UrlInput;
