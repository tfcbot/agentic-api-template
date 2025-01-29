
import { agentPlaneAdapter } from '@orchestrator/adapters/secondary/agent-plane.adapters';
import { GetDeliverableInput, GetDeliverableOutput } from '@orchestrator/metadata/agent-plane.schema';

export const getDeliverableUseCase = async (input: GetDeliverableInput): Promise<GetDeliverableOutput> => {
  try {
    console.log('---Calling Get Deliverable Use Case---')
    return await agentPlaneAdapter.getDeliverable(input);
  } catch (error: any) {
    console.error('Error fetching deliverable:', error);
    throw new Error('Failed to fetch deliverable: ' + error.message);
  }
};