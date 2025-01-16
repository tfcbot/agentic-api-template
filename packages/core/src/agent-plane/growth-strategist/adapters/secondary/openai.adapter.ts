import OpenAI from "openai";
import { Deliverable, DeliverableSchema, RequestGrowthStrategyInput } from "@agent-plane/growth-strategist/metadata/growth-strategist.schema";
import { zodResponseFormat } from "openai/helpers/zod";
import { Resource } from "sst";
import { withRetry } from "@utils/tools/retry";
import { zodToJsonSchema } from "zod-to-json-schema";

const client = new OpenAI({
  apiKey: Resource.OpenAIApiKey.value
});

const growthStrategySystemPrompt = () => `You are an expert growth strategist. Your order is to create a detailed one-page growth strategy based on the provided application idea, ideal customer profile, and target annual revenue. Focus on actionable steps and realistic growth tactics.`;

export const createGrowthStrategy = async (input: RequestGrowthStrategyInput): Promise<Deliverable> => {
  
  try {
    // Create an Assistant
    const assistant = await client.beta.assistants.create({
      name: "Growth Strategist",
      instructions: growthStrategySystemPrompt(),
      model: "gpt-4o",
      response_format: zodResponseFormat(DeliverableSchema, "deliverable"),
      tools: [{ type: "function", function: {
        name: "generateDeliverable",
        parameters: zodToJsonSchema(DeliverableSchema)
      }}]
    });

    // Create a Thread
    const thread = await client.beta.threads.create();

    // Add the user's message to the thread
    await client.beta.threads.messages.create(thread.id, {
      role: "user",
      content: `Please create a growth strategy for:
        Application Idea: ${input.applicationIdea}
        Ideal Customer: ${input.idealCustomer}
        Target Annual Revenue: $${input.targetAnnualRevenue}`
    });
    console.info("Added user message to thread");
    // Run the Assistant and wait for completion
    const run = await client.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id
    });
    console.info("Created run");
    // Wait for completion with proper status handling
    const completedRun = await waitForRunCompletion(client, thread.id, run.id);
    console.info("Completed run");  
    // Get the messages
    const messages = await client.beta.threads.messages.list(thread.id);
    console.info("Got messages");
    const lastMessage = messages.data[0];
    console.info("Got last message");

    if (!lastMessage.content || lastMessage.content.length === 0) {
      throw new Error("No content generated from OpenAI API");
    }
    console.info("Got content");
    // Check if the content is of type 'text'
    const textContent = lastMessage.content.find(c => c.type === 'text');
    if (!textContent) {
      throw new Error("No text content found in the response");
    }
    console.info("Got text content");
    // Parse and validate the response
    const content = JSON.parse(textContent.text.value);
    console.info("Parsed content");
    const validatedContent = await DeliverableSchema.parseAsync(content);
    console.info("Validated content");
    
    // Cleanup
    await client.beta.assistants.del(assistant.id);
    console.info("Deleted assistant");
    await client.beta.threads.del(thread.id);
    console.info("Deleted thread");
    return validatedContent;
  } catch (error) {
    console.error('Error generating growth strategy:', error);
    throw error;
  }
};

// Updated helper function with proper status handling
async function waitForRunCompletion(client: OpenAI, threadId: string, runId: string) {
  while (true) {
    const run = await client.beta.threads.runs.retrieve(threadId, runId);
    
    switch (run.status) {
      case 'completed':
        return run;
      case 'failed':
      case 'cancelled':
      case 'expired':
        throw new Error(`Run ended with status: ${run.status}`);
      case 'requires_action':
        // Handle function calls
        if (run.required_action?.type === 'submit_tool_outputs') {
          const toolCall = run.required_action.submit_tool_outputs.tool_calls[0];
          const functionArgs = JSON.parse(toolCall.function.arguments);
          
          // Submit the tool outputs back to the run
          await client.beta.threads.runs.submitToolOutputs(threadId, runId, {
            tool_outputs: [{
              tool_call_id: toolCall.id,
              output: JSON.stringify(functionArgs)
            }]
          });
        }
        break;
      default:
        // For 'in_progress', 'queued', etc.
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

export const runGrowthStrategy = withRetry(createGrowthStrategy, { retries: 3, delay: 1000, onRetry: (error: Error) => console.warn('Retrying growth strategy generation due to error:', error) });
