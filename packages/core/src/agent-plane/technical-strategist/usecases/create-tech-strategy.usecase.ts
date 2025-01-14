import { Deliverable, RequestOnePageSpecInput } from 'src/agent-plane/technical-strategist/metadata/technical-architect.schema'
import { runTechStrategy } from 'src/agent-plane/technical-strategist/adapters/secondary/openai.adapter';
import { deliverableRepository } from 'src/agent-plane/technical-strategist/adapters/secondary/datastore.adapter';
import { randomUUID } from 'crypto';
import { Message } from '@utils/metadata/message.schema';

export const createTechStrategyUsecase = async (input: RequestOnePageSpecInput): Promise<Message> => {
  console.info("Creating technical strategy for User: ", input.userId);

  try {
    const result = await runTechStrategy(input);
    const deliverable: Deliverable = {
      userId: input.userId,
      deliverableId: randomUUID(),
      deliverableContent: result
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
