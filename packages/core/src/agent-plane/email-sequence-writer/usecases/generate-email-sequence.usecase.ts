import { DeliverableDTO, EmailSequenceInput } from '../metadata/email-sequence-writer.schema';
import { constructPrompt, createEmailSequence } from '@agent-plane/email-sequence-writer/adapters/secondary/openai.adapter';
import { deliverableRepository } from '@agent-plane/email-sequence-writer/adapters/secondary/datastore.adapter';

export async function generateEmailSequenceUseCase(input: EmailSequenceInput): Promise<void> {
  try {

    // Construct the prompt for the specific sequence type
    const prompt = constructPrompt(input);

    // Generate email sequence using OpenAI
    const emailSequence = await createEmailSequence(prompt);

    // Process and validate the generated sequence
    const deliverable: DeliverableDTO = {
      orderId: input.orderId,
      userId: input.userId,
      deliverableId: input.deliverableId,
      deliverableName: input.deliverableName,
      agentId: input.agentId,
      deliverableContent: emailSequence,
    };

    // Save the deliverable using the repository
    await deliverableRepository.saveDeliverable(deliverable);

    // Update order status to completed
  } catch (error) {
    console.error('Error in generateEmailSequenceUseCase:', error);
    throw error;
  }
}



export function calculateCampaignDuration(emails: Array<{ delayDays: number }>): number {
  return emails.reduce((total, email) => total + email.delayDays, 0);
} 