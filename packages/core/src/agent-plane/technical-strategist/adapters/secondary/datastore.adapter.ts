import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { createDeliverableRepository } from 'src/agent-plane/technical-strategist/adapters/secondary/deliverable.repository';

// Set up DynamoDB client
const dynamoDbClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const deliverableRepository = createDeliverableRepository(dynamoDbClient);
