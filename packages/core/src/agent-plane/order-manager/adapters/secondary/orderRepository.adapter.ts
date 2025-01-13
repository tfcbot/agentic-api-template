import { DynamoDBDocumentClient, QueryCommand, QueryCommandOutput, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Resource } from "sst";
import { Order } from "@agent-plane/order-manager/metadata/order.schema";

export interface IOrderRepository {
  getOrders(userId: string): Promise<Order[]>;
}

class OrderRepository implements IOrderRepository {
  constructor(private dbClient: DynamoDBDocumentClient) {}

  async getOrders(userId: string): Promise<Order[]> {
    console.info("Getting orders from database via OrderRepository");
    try {
      const params = {
        TableName: Resource.Orders.tableName,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId
        }
      };
      const orders: QueryCommandOutput = await this.dbClient.send(new QueryCommand(params));
      if (!orders.Items || orders.Items.length === 0) {
        return [];
      }
      const orderItems = orders.Items as Order[];
      return orderItems;
    } catch (error) {
      console.error("Error getting orders:", error);
      throw new Error("Failed to get orders");
    }
  }
}

export const createOrderRepository = (dbClient: DynamoDBDocumentClient): IOrderRepository => new OrderRepository(dbClient);