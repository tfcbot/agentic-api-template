import OpenAI from "openai";
import { DeliverableSchema, RequestOnePageSpecInput } from "@agent-plane/technical-architect/metadata/technical-architect.schema";
import { zodResponseFormat } from "openai/helpers/zod";
import { Resource } from "sst";
import { withRetry } from "@utils/tools/retry";
import { techStrategySystemPrompt } from "@agent-plane/technical-architect/metadata/technical-architect.schema";
const openai = new OpenAI({
  apiKey: Resource.OpenAIApiKey.value
});


export const createTechStrategy = async (input: RequestOnePageSpecInput): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: techStrategySystemPrompt() },
        { role: "user", content: `Please create a technical specification for:
          Application Requirements: ${input.useCases}
          Technical Constraints: ${input.nonFunctional}` }
      ],
      temperature: 0.0,
      response_format: zodResponseFormat(DeliverableSchema, "deliverable")
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
