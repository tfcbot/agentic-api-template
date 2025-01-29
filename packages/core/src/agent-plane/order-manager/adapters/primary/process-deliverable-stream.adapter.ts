import { DynamoDBStreamEvent, Context } from 'aws-lambda';
import { UpdateOrderInput } from '@agent-plane/order-manager/metadata/order.schema';
import { updateOrderUseCase } from '@agent-plane/order-manager/usecases/update-order.usecase';
import { Status } from 'src/orchestrator/metadata/order.schema';

export const processDeliverableStreamAdapter = async (event: DynamoDBStreamEvent, context: Context) => {
  
  console.info('Processing deliverable stream records');
  for (const record of event.Records) {
    if (record.eventName === 'INSERT' || record.eventName === 'MODIFY') {
      console.info(`Processing record with event name: ${record.eventName}`);
      const deliverableRecord = record.dynamodb?.NewImage;

      if (deliverableRecord) {
       
        try {
          console.info(`Saving order for deliverable`);
          const input: UpdateOrderInput = {
              orderId: deliverableRecord.orderId.S || '',
              orderStatus: Status.Completed,
              orderUpdatedAt: new Date().toISOString()
          };
          const message = await updateOrderUseCase(input);
        
        } catch (error) {
          console.error(`Failed to save order for deliverable:`, error);
        }
      }
    }
  }
};
