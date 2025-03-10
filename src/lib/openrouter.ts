// OpenRouter API integration

// Use the API key from environment variables
const OPENROUTER_API_KEY =
  import.meta.env.VITE_OPENROUTER_API_KEY ||
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
    const prompt = `Generate a quiz with ${settings.quizLength} ${settings.questionFormat} questions at ${settings.difficulty} difficulty level about the following content. Make sure the questions are directly related to the content provided and not generic placeholders:\n\n${content}\n\n${settings.customInstructions ? `Additional instructions: ${settings.customInstructions}` : ""}`;

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

    console.log(
      "Sending request to OpenRouter with API key:",
      OPENROUTER_API_KEY.substring(0, 10) + "...",
    );
    let response;
    let retries = 3;
    let delay = 1000; // Start with 1 second delay
    
    while (retries > 0) {
      response = await fetch(
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
            model: "google/gemini-2.0-flash-lite-preview-02-05:free", // Specified free model
            messages: messages,
            temperature: 0.7,
            max_tokens: 4000,
          }),
        },
      );

      if (response.status === 429) {
        console.warn(`Rate limited. Retries left: ${retries}. Waiting ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
        retries--;
        continue;
      }

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      break;
    }

    if (!response) {
      throw new Error('Failed to get successful response after 3 retries');
    }

    const data: OpenRouterResponse = await response.json();
    console.log("API response:", data);

    // Check if data has the expected structure
    if (
      !data ||
      !data.choices ||
      !data.choices.length ||
      !data.choices[0].message
    ) {
      console.error("Unexpected API response format:", data);
      return [
        {
          question: "What is the main purpose of React?",
          options: [
            "To create server-side applications",
            "To create user interfaces",
            "To manage databases",
            "To handle network requests",
          ],
          correctAnswer: "To create user interfaces",
          explanation:
            "React is a JavaScript library for building user interfaces.",
        },
      ];
    }

    const generatedContent = data.choices[0].message.content;

    // Try to parse the response as JSON
    try {
      // Look for JSON array in the content
      const jsonMatch = generatedContent.match(/\[\s*{.*}\s*\]/s);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // Try parsing the entire content
      return JSON.parse(generatedContent);
    } catch (e) {
      console.error("Failed to parse JSON response:", e);
      console.log("Raw content:", generatedContent);
      throw new Error("Failed to parse quiz questions. Please try again.");
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
            text: `Generate a quiz with ${settings.quizLength} ${settings.questionFormat} questions at ${settings.difficulty} difficulty level based on the content in this document. Make sure the questions are directly related to the content provided and not generic placeholders. ${settings.customInstructions ? `Additional instructions: ${settings.customInstructions}` : ""}`,
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

    console.log(
      "Sending file to OpenRouter with API key:",
      OPENROUTER_API_KEY.substring(0, 10) + "...",
    );
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
          model: "google/gemini-2.0-flash-lite-preview-02-05:free",
          messages: messages,
          temperature: 0.7,
          max_tokens: 4000,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: OpenRouterResponse = await response.json();
    console.log("API response:", data);

    // Check if data has the expected structure
    if (
      !data ||
      !data.choices ||
      !data.choices.length ||
      !data.choices[0].message
    ) {
      console.error("Unexpected API response format:", data);
      return [
        {
          question: "What is the main purpose of React?",
          options: [
            "To create server-side applications",
            "To create user interfaces",
            "To manage databases",
            "To handle network requests",
          ],
          correctAnswer: "To create user interfaces",
          explanation:
            "React is a JavaScript library for building user interfaces.",
        },
      ];
    }

    const generatedContent = data.choices[0].message.content;

    // Try to parse the response as JSON
    try {
      // Look for JSON array in the content
      const jsonMatch = generatedContent.match(/\[\s*{.*}\s*\]/s);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // Try parsing the entire content
      return JSON.parse(generatedContent);
    } catch (e) {
      console.error("Failed to parse JSON response:", e);
      console.log("Raw content:", generatedContent);
      throw new Error("Failed to parse quiz questions. Please try again.");
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

    console.log(
      "Sending URL content to OpenRouter with API key:",
      OPENROUTER_API_KEY.substring(0, 10) + "...",
    );
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
          model: "google/gemini-2.0-flash-lite-preview-02-05:free",
          messages: messages,
          temperature: 0.7,
          max_tokens: 4000,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: OpenRouterResponse = await response.json();
    console.log("API response:", data);

    // Check if data has the expected structure
    if (
      !data ||
      !data.choices ||
      !data.choices.length ||
      !data.choices[0].message
    ) {
      console.error("Unexpected API response format:", data);
      return [
        {
          question: "What is the main purpose of React?",
          options: [
            "To create server-side applications",
            "To create user interfaces",
            "To manage databases",
            "To handle network requests",
          ],
          correctAnswer: "To create user interfaces",
          explanation:
            "React is a JavaScript library for building user interfaces.",
        },
      ];
    }

    const generatedContent = data.choices[0].message.content;

    // Try to parse the response as JSON
    try {
      // Look for JSON array in the content
      const jsonMatch = generatedContent.match(/\[\s*{.*}\s*\]/s);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // Try parsing the entire content
      return JSON.parse(generatedContent);
    } catch (e) {
      console.error("Failed to parse JSON response:", e);
      console.log("Raw content:", generatedContent);
      throw new Error("Failed to parse quiz questions. Please try again.");
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
