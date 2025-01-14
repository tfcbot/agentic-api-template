import OpenAI from "openai";
import { Deliverable, DeliverableDTO, DeliverableSchema, RequestOnePageValueInput } from "@agent-plane/value-strategist/metadata/value-strategist.schema";
import { zodResponseFormat } from "openai/helpers/zod";
import { Resource } from "sst";
import { withRetry } from "@utils/tools/retry";
import { ValueStrategySchema } from "@agent-plane/value-strategist/metadata/value-strategist.schema";
import { valueStrategySystemPrompt } from "@agent-plane/value-strategist/metadata/value-stategist.prompts";
const openai = new OpenAI({
  apiKey: Resource.OpenAIApiKey.value
});


export const createValueStrategy = async (input: RequestOnePageValueInput): Promise<Deliverable> => {
  try {
    const response = await openai.beta.chat.completions.parse({
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
      response_format: zodResponseFormat(DeliverableSchema, "deliverable")
    });

    const content = response.choices[0].message.parsed;
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
