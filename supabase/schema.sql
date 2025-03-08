-- Create tables for the Rollon Quiz Generator app

-- Users table is handled by Supabase Auth

-- Quizzes table
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  questions JSONB NOT NULL,
  difficulty TEXT NOT NULL,
  question_format TEXT NOT NULL,
  quiz_length INTEGER NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  last_attempted TIMESTAMP WITH TIME ZONE,
  last_score INTEGER
);

-- Quiz results table
CREATE TABLE quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  answers JSONB NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX quizzes_user_id_idx ON quizzes(user_id);
CREATE INDEX quiz_results_quiz_id_idx ON quiz_results(quiz_id);
CREATE INDEX quiz_results_user_id_idx ON quiz_results(user_id);

-- Enable Row Level Security
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own quizzes" 
  ON quizzes FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quizzes" 
  ON quizzes FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quizzes" 
  ON quizzes FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own quizzes" 
  ON quizzes FOR DELETE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own quiz results" 
  ON quiz_results FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz results" 
  ON quiz_results FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
