import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { createAgentsRepository } from '@agent-plane/agent-manager/adapters/secondary/agents.repository';
// Set up DynamoDB client
const dynamoDbClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const agentsRepository = createAgentsRepository(dynamoDbClient);