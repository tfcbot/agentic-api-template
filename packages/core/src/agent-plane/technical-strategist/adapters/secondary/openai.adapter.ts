import OpenAI from "openai";
import { Deliverable, DeliverableSchema, RequestOnePageSpecInput } from "@agent-plane/technical-strategist/metadata/technical-architect.schema";
import { Resource } from "sst";
import { withRetry } from "@utils/tools/retry";
import { techStrategySystemPrompt } from "../../metadata/technical-strategist.prompt";
import { zodToJsonSchema } from "zod-to-json-schema";
import { zodResponseFormat } from "openai/helpers/zod";

const client = new OpenAI({
  apiKey: Resource.OpenAIApiKey.value
});

export const createTechStrategy = async (input: RequestOnePageSpecInput): Promise<Deliverable> => {
  try {
    // Create an Assistant
    const assistant = await client.beta.assistants.create({
      name: "Technical Strategist",
      instructions: techStrategySystemPrompt(),
      model: "gpt-4o",
      response_format: zodResponseFormat(DeliverableSchema, "deliverable"),
      tools: [{ type: "function", function: {
        name: "generateDeliverable",
        parameters: zodToJsonSchema(DeliverableSchema)
      }}]
    });

    // Create a Thread
    const thread = await client.beta.threads.create();

    // Run the Assistant and wait for completion
    const run = await client.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id
    });

    // Wait for completion with proper status handling
    const completedRun = await waitForRunCompletion(client, thread.id, run.id);
    
    // Get the messages (only after run is completed)
    const messages = await client.beta.threads.messages.list(thread.id);
    const lastMessage = messages.data[0];

    if (!lastMessage.content || lastMessage.content.length === 0) {
      throw new Error("No content generated from OpenAI API");
    }

    // Check if the content is of type 'text'
    const textContent = lastMessage.content.find(c => c.type === 'text');
    if (!textContent) {
      throw new Error("No text content found in the response");
    }
    // Parse and validate the response
    const content = JSON.parse(textContent.text.value);

    const validatedContent = await DeliverableSchema.parseAsync(content);
    
    // Cleanup
    await client.beta.assistants.del(assistant.id);
    await client.beta.threads.del(thread.id);

    return validatedContent;
  } catch (error) {
    console.error('Error generating technical strategy:', error);
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

export const runTechStrategy = withRetry(createTechStrategy, {
  retries: 3,
  delay: 1000,
  onRetry: (error: Error) => console.warn('Retrying tech strategy generation due to error:', error)
});