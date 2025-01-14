import OpenAI from "openai";
import { Deliverable, DeliverableSchema, RequestOnePageGrowthInput } from "@agent-plane/growth-strategist/metadata/growth-strategist.schema";
import { zodResponseFormat } from "openai/helpers/zod";
import { Resource } from "sst";
import { withRetry } from "@utils/tools/retry";

const openai = new OpenAI({
  apiKey: Resource.OpenAIApiKey.value
});

const growthStrategySystemPrompt = () => `You are an expert growth strategist. Your task is to create a detailed one-page growth strategy based on the provided application idea, ideal customer profile, and target annual revenue. Focus on actionable steps and realistic growth tactics.`;

export const createGrowthStrategy = async (input: RequestOnePageGrowthInput): Promise<Deliverable> => {
  try {
    const response = await openai.beta.chat.completions.parse({
      model: "gpt-4",
      messages: [
        { role: "system", content: growthStrategySystemPrompt() },
        { role: "user", content: `Please create a growth strategy for:
          Application Idea: ${input.applicationIdea}
          Ideal Customer: ${input.idealCustomer}
          Target Annual Revenue: $${input.targetAnnualRevenue}` }
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
    console.error('Error generating growth strategy:', error);
    throw error;
  }
};

export const runGrowthStrategy = withRetry(createGrowthStrategy, { retries: 3, delay: 1000, onRetry: (error: Error) => console.warn('Retrying growth strategy generation due to error:', error) });
