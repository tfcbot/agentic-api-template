import { DynamoDBDocumentClient, QueryCommand, QueryCommandOutput, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { Resource } from "sst";
import { Order, UpdateOrderInput } from "@agent-plane/order-manager/metadata/order.schema";

export interface IOrderRepository {
  getOrders(userId: string): Promise<Order[]>;
  saveOrder(order: Order): Promise<void>;
  updateOrder(order: UpdateOrderInput): Promise<void>;
}

class OrderRepository implements IOrderRepository {
  constructor(private dbClient: DynamoDBDocumentClient) {}

  async getOrders(userId: string): Promise<Order[]> {
    console.info("Getting orders from database via OrderRepository");
    try {
      const params = {
        TableName: Resource.Orders.name,
        IndexName: "UserIdIndex",
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

  async saveOrder(order: Order): Promise<void> {
    console.info("Saving order to database via OrderRepository");
    const params = {
      TableName: Resource.Orders.name,
      Item: order
    };
    await this.dbClient.send(new PutCommand(params));
  }

  async updateOrder(order: UpdateOrderInput): Promise<void> {
    console.info("Updating order to database via OrderRepository");
    const params = {
      TableName: Resource.Orders.name,
      Key: {
        orderId: order.orderId
      },
      UpdateExpression: "set orderStatus = :orderStatus, orderUpdatedAt = :orderUpdatedAt",
      ExpressionAttributeValues: {
        ":orderStatus": order.orderStatus,
        ":orderUpdatedAt": order.orderUpdatedAt
      }
    };
    await this.dbClient.send(new UpdateCommand(params));
  }
}

export const createOrderRepository = (dbClient: DynamoDBDocumentClient): IOrderRepository => new OrderRepository(dbClient);