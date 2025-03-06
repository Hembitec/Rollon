import React, { useState, useCallback } from "react";
import { Upload, File, X, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect?: (file: File) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in MB
}

const FileUpload = ({
  onFileSelect = () => {},
  acceptedFileTypes = [".pdf", ".docx", ".txt"],
  maxFileSize = 10, // 10MB default
}: FileUploadProps) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): boolean => {
    // Check file type
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!acceptedFileTypes.includes(fileExtension)) {
      setError(
        `Invalid file type. Accepted types: ${acceptedFileTypes.join(", ")}`,
      );
      return false;
    }

    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      setError(`File size exceeds the maximum limit of ${maxFileSize}MB`);
      return false;
    }

    return true;
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      setError("");

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (validateFile(file)) {
          setSelectedFile(file);
          simulateUpload(file);
        }
      }
    },
    [acceptedFileTypes, maxFileSize],
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        simulateUpload(file);
      }
    }
  };

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setIsUploaded(false);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsUploaded(true);
          onFileSelect(file);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setIsUploaded(false);
    setError("");
  };

  return (
    <div className="w-full bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow-sm transition-colors duration-200">
      {!selectedFile ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors",
            dragActive
              ? "border-primary bg-primary/5 dark:bg-primary/10"
              : "border-gray-300 hover:border-primary/50 dark:border-gray-600 dark:hover:border-primary/50",
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <Upload className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
          <h3 className="text-lg font-medium mb-2 dark:text-white">
            Drag & Drop your file here
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
            or click to browse your files
            <br />
            Supported formats: {acceptedFileTypes.join(", ")}
          </p>
          <Button variant="outline" className="mt-2">
            <File className="mr-2 h-4 w-4" /> Select File
          </Button>
          <Input
            id="file-input"
            type="file"
            className="hidden"
            onChange={handleFileInput}
            accept={acceptedFileTypes.join(",")}
          />
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <File className="h-6 w-6 text-primary mr-3" />
              <div>
                <p className="font-medium truncate max-w-[200px] sm:max-w-xs">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveFile}
              className="text-gray-500 hover:text-red-500"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-2">
            {isUploading && (
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {isUploaded && (
              <div className="flex items-center text-green-600 text-sm">
                <Check className="h-4 w-4 mr-1" /> File uploaded successfully
              </div>
            )}

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
