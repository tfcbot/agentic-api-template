import OpenAI from 'openai';
import { EmailSequenceOutputSchema, PromptInput } from '@agent-plane/email-sequence-writer/metadata/email-sequence-writer.schema';
import { zodResponseFormat } from 'openai/helpers/zod';
import { Resource } from 'sst';
import { withRetry } from '@utils/tools/retry';
import { EmailSequencePrompts } from '@agent-plane/email-sequence-writer/metadata/email-sequence-writer.prompts';
import { zodToJsonSchema } from 'zod-to-json-schema';

const client = new OpenAI({
  apiKey: Resource.OpenAIApiKey.value
});

export function constructPrompt(input: PromptInput): string {
  const { emailSequenceType, idealCustomerProfile } = input;

  return `
    ${EmailSequencePrompts.systemPrompt}

    ${EmailSequencePrompts.sequenceTypePrompts[emailSequenceType]}

    Target Audience:
    - Ideal Customer Profile: ${idealCustomerProfile}
    ${EmailSequencePrompts.emailStructurePrompt}
    `;
}

export const createEmailSequence = async (prompt: string) => {
  try {
    // Create an Assistant
    const assistant = await client.beta.assistants.create({
      name: "Email Sequence Writer",
      instructions: EmailSequencePrompts.systemPrompt,
      model: "gpt-4o",
      response_format: zodResponseFormat(EmailSequenceOutputSchema, "emailSequence"),
      tools: [{
        type: "function",
        function: {
          name: "generateEmailSequence",
          parameters: zodToJsonSchema(EmailSequenceOutputSchema)
        }
      }]
    });

    // Create a Thread
    const thread = await client.beta.threads.create();

    // Add the user message to the thread
    await client.beta.threads.messages.create(thread.id, {
      role: "user",
      content: prompt
    });

    // Run the Assistant and wait for completion
    const run = await client.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id
    });

    // Wait for completion with proper status handling
    const completedRun = await waitForRunCompletion(client, thread.id, run.id);
    
    // Get the messages
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
    const validatedContent = await EmailSequenceOutputSchema.parseAsync(content);
    
    // Cleanup
    await client.beta.assistants.del(assistant.id);
    await client.beta.threads.del(thread.id);

    return validatedContent;
  } catch (error) {
    console.error('Error generating email sequence:', error);
    throw error;
  }
};

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

export const generateEmailSequence = withRetry(createEmailSequence, {
  retries: 3,
  delay: 1000,
  onRetry: (error: Error) => console.warn('Retrying email sequence generation due to error:', error)
}); 