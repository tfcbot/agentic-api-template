import OpenAI from "openai";
import { RequestOnePageSpecInput } from "@agent-plane/technical-architect/metadata/technical-architect.schema";
import { zodToJsonSchema } from "zod-to-json-schema";
import { Resource } from "sst";
import { withRetry } from "@utils/tools/retry";

const openai = new OpenAI({
  apiKey: Resource.OpenAIApiKey.value
});

const techStrategySystemPrompt = () => `You are an expert technical architect. Your task is to create a detailed one-page technical specification based on the provided application requirements, technical constraints, and scalability needs. Focus on architecture decisions and implementation recommendations.`;

export const createTechStrategy = async (input: RequestOnePageSpecInput): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: techStrategySystemPrompt() },
        { role: "user", content: `Please create a technical specification for:
          Application Requirements: ${input.useCases}
          Technical Constraints: ${input.nonFunctional}` }
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
    console.error('Error generating technical strategy:', error);
    throw error;
  }
};

export const runTechStrategy = withRetry(createTechStrategy, { retries: 3, delay: 1000, onRetry: (error: Error) => console.warn('Retrying tech strategy generation due to error:', error) });
