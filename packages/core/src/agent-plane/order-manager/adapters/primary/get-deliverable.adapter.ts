import { GetDeliverableInput, GetDeliverableOutput } from '@agent-plane/order-manager/metadata/deliverable.schema';
import { getDeliverableUseCase } from '@agent-plane/order-manager/usecases/get-deliverable.usecase';

export class GetDeliverableAdapter {
  async execute(input: GetDeliverableInput): Promise<GetDeliverableOutput> {
    try {
      const result = await getDeliverableUseCase(input);
      return result;
    } catch (error) {
      console.error('Error in GetDeliverableAdapter:', error);
      throw new Error('Failed to retrieve deliverable');
    }
  }
}

export const getDeliverableAdapter = new GetDeliverableAdapter();