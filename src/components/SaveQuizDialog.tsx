import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Save, X, AlertCircle } from "lucide-react";
import { saveQuiz } from "@/lib/quiz";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface SaveQuizDialogProps {
  trigger?: React.ReactNode;
  onSave?: (data: { title: string; description: string }) => void;
  defaultTitle?: string;
  defaultDescription?: string;
  questions?: any[];
  settings?: {
    difficulty: string;
    questionFormat: string;
    quizLength: number;
  };
  content?: string;
}

const SaveQuizDialog = ({
  trigger,
  onSave = () => {},
  defaultTitle = "",
  defaultDescription = "",
  questions = [],
  settings = {
    difficulty: "medium",
    questionFormat: "multiple-choice",
    quizLength: 10,
  },
  content = "",
}: SaveQuizDialogProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!title.trim()) return;

    setIsSaving(true);
    setError(null);

    try {
      // Check if user is authenticated
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        setError("You must be logged in to save quizzes");
        return;
      }

      // Save quiz to Supabase
      await saveQuiz({
        title,
        description,
        questions,
        difficulty: settings.difficulty,
        questionFormat: settings.questionFormat,
        quizLength: settings.quizLength,
        content,
      });

      onSave({ title, description });
      setOpen(false);
      navigate("/saved");
    } catch (err: any) {
      console.error("Error saving quiz:", err);
      setError(err.message || "Failed to save quiz. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Quiz
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save Quiz</DialogTitle>
          <DialogDescription>
            Save this quiz to access it later from your dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Quiz Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for your quiz"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a brief description of this quiz"
              rows={3}
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start text-sm">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={!title.trim() || isSaving}
          >
            {isSaving ? "Saving..." : "Save Quiz"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveQuizDialog;
