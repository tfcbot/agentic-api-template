import OpenAI from "openai";
import { RequestOnePageValueInput } from "@agent-plane/value-strategist/metadata/value-strategist.schema";
import { Resource } from "sst";
import { withRetry } from "@utils/tools/retry";

const openai = new OpenAI({
  apiKey: Resource.OpenAIApiKey.value
});

const valueStrategySystemPrompt = () => `You are an expert value strategist. Your task is to create a detailed one-page value proposition based on the provided application idea, target customer, problem, and proposed solution. Focus on articulating the unique value and competitive advantages.`;

export const createValueStrategy = async (input: RequestOnePageValueInput): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: valueStrategySystemPrompt() },
        { role: "user", content: `Please create a value proposition for:
          Application Idea: ${input.applicationIdea}
          Ideal Customer: ${input.idealCustomer}
          Problem: ${input.problem}
          Solution: ${input.solution}` }
      ],
      temperature: 0.7,
      response_format: { type: "text" }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content generated from OpenAI API");
    }

    return content;
  } catch (error) {
    console.error('Error generating value strategy:', error);
    throw error;
  }
};

export const runValueStrategy = withRetry(createValueStrategy, { retries: 3, delay: 1000, onRetry: (error: Error) => console.warn('Retrying value strategy generation due to error:', error) });
