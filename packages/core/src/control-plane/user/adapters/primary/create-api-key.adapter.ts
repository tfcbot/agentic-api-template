import { DynamoDBStreamEvent, Context } from 'aws-lambda';
import { createApiKeyUseCase } from '@control-plane/user/usecases/create-api-key.usecase';
import { CreateApiKeyCommand } from '@control-plane/user/metadata/api-key.schema';


export const createApiKeyAdapter = async (event: DynamoDBStreamEvent, context: Context) => {
  console.log("---Create API key handler---");
  for (const record of event.Records) {
    if (record.eventName !== 'INSERT') continue;
    
    const newUser = record.dynamodb?.NewImage;
    if (!newUser?.userId?.S) {
      console.error('User ID is undefined');
      throw new Error('User ID is undefined');
    }

    const userId = newUser.userId.S;
    

    try {
      const input: CreateApiKeyCommand = {
        userId: userId,
      }
      const message = await createApiKeyUseCase(input);
      console.info(message);
    } catch (error) {
      console.error(`Failed to create API key for user ${userId}:`, error);
    }
  }
};