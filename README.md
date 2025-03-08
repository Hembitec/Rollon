# Rollon - AI-Powered Quiz Generator

Rollon is an AI-powered web application that transforms any learning material into personalized test questions, acting as a private tutor. Users can upload text, paste content, or provide links, and the AI will generate quizzes tailored to their learning needs.

## Setup Instructions

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# OpenRouter API Key
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup

1. Create a new Supabase project
2. Run the SQL script in `supabase/schema.sql` to set up the database schema
3. Update the `.env` file with your Supabase URL and anon key

### OpenRouter Setup

1. Create an account at [OpenRouter](https://openrouter.ai/)
2. Generate an API key
3. Update the `.env` file with your OpenRouter API key

### Installation

```bash
npm install
npm run dev
```

## Features

- AI-powered quiz generation from text, files, or URLs
- Customizable quiz settings (difficulty, format, length)
- Save quizzes to your account
- Take quizzes and track your progress
- Download quizzes as PDF

## Technologies Used

- React + TypeScript
- Vite
- Tailwind CSS
- Supabase (Authentication & Database)
- OpenRouter API (AI Integration)
