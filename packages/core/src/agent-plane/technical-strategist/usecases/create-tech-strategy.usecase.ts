import { Deliverable, DeliverableDTO, RequestTechStrategyInput } from '@agent-plane/technical-strategist/metadata/technical-architect.schema'
import { runTechStrategy } from '@agent-plane/technical-strategist/adapters/secondary/openai.adapter';
import { deliverableRepository } from '@agent-plane/technical-strategist/adapters/secondary/datastore.adapter';
import { randomUUID } from 'crypto';
import { Message } from '@utils/metadata/message.schema';

export const createTechStrategyUsecase = async (input: RequestTechStrategyInput): Promise<Message> => {
  console.info("--- Creating Technical Strategy via Usecase ---");

  try {
    const result = await runTechStrategy(input);
    const deliverable: DeliverableDTO = {
      userId: input.userId,
      orderId: input.orderId,
      deliverableId: input.deliverableId,
      deliverableName: input.deliverableName,
      ...result
    };
    await deliverableRepository.saveDeliverable(deliverable);

    return {
      message: "Technical strategy created successfully"
    };

  } catch (error) {
    console.error('Error generating technical strategy:', error);
    throw new Error('Failed to generate technical strategy');
  }
};
