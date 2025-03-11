import Groq from "groq-sdk";

export interface AISummary {
  summary: string;
}

// Check if the environment variable is set
const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

if (!apiKey) {
  throw new Error("The NEXT_PUBLIC_GROQ_API_KEY environment variable is missing or empty.");
}

const groq = new Groq({ apiKey: apiKey, dangerouslyAllowBrowser: true });

export const getAISummary = async (search: string): Promise<AISummary> => {

  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant. Provide a concise summary of the following content term.",
      },
      {
        role: "user",
        content: search,
      },
    ],
    model: "llama-3.1-8b-instant",
  });

  const summary = response.choices[0]?.message?.content || "No summary available.";

  return { summary };
};
