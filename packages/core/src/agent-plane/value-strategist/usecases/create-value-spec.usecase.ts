import { DeliverableDTO, RequestOnePageValueInput } from '@agent-plane/value-strategist/metadata/value-strategist.schema'
import { runValueStrategy } from '@agent-plane/value-strategist/adapters/secondary/openai.adapter';
import { Message } from '@utils/metadata/message.schema';
import { randomUUID } from 'crypto';
import { deliverableRepository } from '@agent-plane/value-strategist/adapters/secondary/datasotre.adapter';

export const createValueSpecUsecase = async (input: RequestOnePageValueInput): Promise<Message> => {
  console.info("Creating value strategy for User: ", input.userId);

  try {
    const deliverableContent = await runValueStrategy(input);
    const deliverable: DeliverableDTO = {
      userId: input.userId,
      ...deliverableContent
    };
    await deliverableRepository.saveDeliverable(deliverable);
    return {
      message: "Value strategy created successfully"
    };

  } catch (error) {
    console.error('Error generating value strategy:', error);
    throw new Error('Failed to generate value strategy');
  }
};
