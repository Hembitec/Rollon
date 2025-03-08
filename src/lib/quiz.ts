import { supabase } from "./supabase";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Quiz {
  id?: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  difficulty: string;
  questionFormat: string;
  quizLength: number;
  createdAt?: string;
  userId?: string;
  content?: string;
}

// Save quiz to Supabase
export async function saveQuiz(quiz: Quiz) {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("quizzes")
      .insert([
        {
          title: quiz.title,
          description: quiz.description,
          questions: quiz.questions,
          difficulty: quiz.difficulty,
          question_format: quiz.questionFormat,
          quiz_length: quiz.quizLength,
          created_at: new Date().toISOString(),
          user_id: userData.user.id,
          content: quiz.content || "",
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error saving quiz:", error);
    throw error;
  }
}

// Save quiz result
export async function saveQuizResult(result: {
  quizId: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  answers: Record<string, string>;
  completedAt: string;
}) {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("quiz_results")
      .insert([
        {
          quiz_id: result.quizId,
          user_id: userData.user.id,
          score: result.score,
          correct_answers: result.correctAnswers,
          total_questions: result.totalQuestions,
          answers: result.answers,
          completed_at: result.completedAt,
        },
      ])
      .select();

    if (error) throw error;

    // Also update the quiz with the last attempt info
    if (result.quizId !== "current") {
      await supabase
        .from("quizzes")
        .update({
          last_attempted: result.completedAt,
          last_score: result.score,
        })
        .eq("id", result.quizId);
    }

    return data[0];
  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw error;
  }
}

// Get all quizzes for the current user
export async function getUserQuizzes() {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("quizzes")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Transform the data to match our Quiz interface
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      questions: item.questions,
      difficulty: item.difficulty,
      questionFormat: item.question_format,
      quizLength: item.quiz_length,
      createdAt: item.created_at,
      userId: item.user_id,
      content: item.content,
    }));
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
}

// Get a specific quiz by ID
export async function getQuizById(quizId: string) {
  try {
    const { data, error } = await supabase
      .from("quizzes")
      .select("*")
      .eq("id", quizId)
      .single();

    if (error) throw error;

    // Transform the data to match our Quiz interface
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      questions: data.questions,
      difficulty: data.difficulty,
      questionFormat: data.question_format,
      quizLength: data.quiz_length,
      createdAt: data.created_at,
      userId: data.user_id,
      content: data.content,
    };
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error;
  }
}

// Delete a quiz
export async function deleteQuiz(quizId: string) {
  try {
    const { error } = await supabase.from("quizzes").delete().eq("id", quizId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
}

// Generate PDF from quiz
export function generateQuizPDF(quiz: Quiz) {
  import("./pdf").then((module) => {
    module.generatePDF(quiz);
  });
}
