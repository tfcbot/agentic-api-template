import { RequestGrowthStrategyInput, RequestGrowthStrategyOutput } from '@agent-plane/growth-strategist/metadata/growth-strategist.schema'
import { runGrowthStrategy } from '@agent-plane/growth-strategist/adapters/secondary/openai.adapter';
import { DeliverableDTO } from '@agent-plane/growth-strategist/metadata/growth-strategist.schema';
import { randomUUID } from 'crypto';
import { deliverableRepository } from '@agent-plane/growth-strategist/adapters/secondary/datastore.adapter';
import { Message } from '@utils/metadata/message.schema';

export const createStrategyUsecase = async (input: RequestGrowthStrategyInput): Promise<Message> => {
  console.info("Creating growth strategy for User");

  try {
    const content = await runGrowthStrategy(input);
    const deliverable: DeliverableDTO = {
      userId: input.userId,
      orderId: input.orderId,
      deliverableId: input.deliverableId,
      deliverableName: input.deliverableName,
      agentId: input.agentId,
      ...content
    };
    await deliverableRepository.saveDeliverable(deliverable);
    return {
      message: 'Growth strategy created successfully',
    };

  } catch (error) {
    console.error('Error generating growth strategy:', error);
    throw new Error('Failed to generate growth strategy');
  }
};
