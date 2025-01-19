import { GetDeliverableInput, GetDeliverableOutput } from '@agent-plane/order-manager/metadata/deliverable.schema';
import { deliverableRepository } from '@agent-plane/order-manager/adapters/secondary/datastore.adapter';


export const getDeliverableUseCase = async (input: GetDeliverableInput): Promise<GetDeliverableOutput> => {
  console.info("Getting deliverable for Order: ", input.orderId);

  try {
    const deliverable = await deliverableRepository.getDeliverable(input);
    return deliverable; 
  } catch (error) {
    console.error('Error retrieving deliverable:', error);
    throw new Error('Failed to retrieve deliverable');
  }
};

