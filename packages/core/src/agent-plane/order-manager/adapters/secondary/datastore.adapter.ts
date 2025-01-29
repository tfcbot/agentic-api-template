import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { createDeliverableRepository } from '@agent-plane/order-manager/adapters/secondary/deliverableRepository.adapter';
import { createOrderRepository } from '@agent-plane/order-manager/adapters/secondary/orderRepository.adapter';
// Set up DynamoDB client
const dynamoDbClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const deliverableRepository = createDeliverableRepository(dynamoDbClient);
export const orderRepository = createOrderRepository(dynamoDbClient);