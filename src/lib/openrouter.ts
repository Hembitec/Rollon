// OpenRouter API integration

const OPENROUTER_API_KEY =
  "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";
const SITE_URL = window.location.origin;
const SITE_NAME = "Rollon Quiz Generator";

interface Message {
  role: string;
  content:
    | string
    | Array<{ type: string; text?: string; image_url?: { url: string } }>;
}

interface OpenRouterResponse {
  id: string;
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function generateQuizQuestions(
  content: string,
  settings: {
    difficulty: string;
    questionFormat: string;
    quizLength: number;
    language?: string;
    customInstructions?: string;
  },
) {
  try {
    const prompt = `Generate a quiz with ${settings.quizLength} ${settings.questionFormat} questions at ${settings.difficulty} difficulty level about the following content:\n\n${content}\n\n${settings.customInstructions ? `Additional instructions: ${settings.customInstructions}` : ""}`;

    const messages: Message[] = [
      {
        role: "system",
        content: `You are an expert quiz creator. Create high-quality, educational quiz questions based on the provided content. For multiple-choice questions, include 4 options with one correct answer. For true/false questions, clearly indicate the correct answer. For short-answer questions, provide the expected answer. Format the output as a JSON array of question objects with the following structure: [{"question": "Question text", "options": ["Option A", "Option B", "Option C", "Option D"], "correctAnswer": "Correct option", "explanation": "Brief explanation"}]`,
      },
      {
        role: "user",
        content: prompt,
      },
    ];

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": SITE_URL,
          "X-Title": SITE_NAME,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-opus:beta",
          messages: messages,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: OpenRouterResponse = await response.json();
    const generatedContent = data.choices[0].message.content;

    // Try to parse the response as JSON
    try {
      return JSON.parse(generatedContent);
    } catch (e) {
      // If parsing fails, return the raw text
      return generatedContent;
    }
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    throw error;
  }
}

export async function generateQuizFromFile(
  file: File,
  settings: {
    difficulty: string;
    questionFormat: string;
    quizLength: number;
    language?: string;
    customInstructions?: string;
  },
) {
  // Convert file to base64
  const base64 = await fileToBase64(file);

  try {
    const messages: Message[] = [
      {
        role: "system",
        content: `You are an expert quiz creator. Create high-quality, educational quiz questions based on the provided document. For multiple-choice questions, include 4 options with one correct answer. For true/false questions, clearly indicate the correct answer. For short-answer questions, provide the expected answer. Format the output as a JSON array of question objects with the following structure: [{"question": "Question text", "options": ["Option A", "Option B", "Option C", "Option D"], "correctAnswer": "Correct option", "explanation": "Brief explanation"}]`,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Generate a quiz with ${settings.quizLength} ${settings.questionFormat} questions at ${settings.difficulty} difficulty level based on the content in this document. ${settings.customInstructions ? `Additional instructions: ${settings.customInstructions}` : ""}`,
          },
          {
            type: "image_url",
            image_url: {
              url: base64,
            },
          },
        ],
      },
    ];

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": SITE_URL,
          "X-Title": SITE_NAME,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen/qwen2.5-vl-72b-instruct:free",
          messages: messages,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: OpenRouterResponse = await response.json();
    const generatedContent = data.choices[0].message.content;

    // Try to parse the response as JSON
    try {
      return JSON.parse(generatedContent);
    } catch (e) {
      // If parsing fails, return the raw text
      return generatedContent;
    }
  } catch (error) {
    console.error("Error generating quiz from file:", error);
    throw error;
  }
}

export async function generateQuizFromUrl(
  url: string,
  content: string,
  settings: {
    difficulty: string;
    questionFormat: string;
    quizLength: number;
    language?: string;
    customInstructions?: string;
  },
) {
  try {
    const prompt = `Generate a quiz with ${settings.quizLength} ${settings.questionFormat} questions at ${settings.difficulty} difficulty level about the content from this URL: ${url}\n\nExtracted content: ${content}\n\n${settings.customInstructions ? `Additional instructions: ${settings.customInstructions}` : ""}`;

    const messages: Message[] = [
      {
        role: "system",
        content: `You are an expert quiz creator. Create high-quality, educational quiz questions based on the provided content. For multiple-choice questions, include 4 options with one correct answer. For true/false questions, clearly indicate the correct answer. For short-answer questions, provide the expected answer. Format the output as a JSON array of question objects with the following structure: [{"question": "Question text", "options": ["Option A", "Option B", "Option C", "Option D"], "correctAnswer": "Correct option", "explanation": "Brief explanation"}]`,
      },
      {
        role: "user",
        content: prompt,
      },
    ];

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": SITE_URL,
          "X-Title": SITE_NAME,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-opus:beta",
          messages: messages,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: OpenRouterResponse = await response.json();
    const generatedContent = data.choices[0].message.content;

    // Try to parse the response as JSON
    try {
      return JSON.parse(generatedContent);
    } catch (e) {
      // If parsing fails, return the raw text
      return generatedContent;
    }
  } catch (error) {
    console.error("Error generating quiz from URL:", error);
    throw error;
  }
}

// Helper function to convert file to base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
