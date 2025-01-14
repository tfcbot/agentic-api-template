import { DynamoDBDocumentClient, GetCommand, GetCommandOutput, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { Resource } from "sst";
import { GetDeliverableInput, GetDeliverableOutput } from "@agent-plane/order-manager/metadata/deliverable.schema";
import { DeliverableDTO } from "@agent-plane/growth-strategist/metadata/growth-strategist.schema";

export interface IDeliverableRepository {
  getDeliverable(input: GetDeliverableInput): Promise<GetDeliverableOutput>;
  getDeliverablesByOrderId(input: GetDeliverableInput): Promise<GetDeliverableOutput[]>;
}

class DeliverableRepository implements IDeliverableRepository {
  constructor(private dbClient: DynamoDBDocumentClient) {}

  async getDeliverable(input: GetDeliverableInput): Promise<GetDeliverableOutput> {
    console.info("Getting deliverable from database via DeliverableRepository");
    try {
      const params = {
        TableName: Resource.Deliverables.tableName,
        Key: {
          deliverableId: input.deliverableId
        }
      };
      const deliverable: GetCommandOutput = await this.dbClient.send(new GetCommand(params));
      if (!deliverable.Item) {
        throw new Error("Deliverable not found");
      }
      return deliverable.Item as GetDeliverableOutput;
    } catch (error) {
      console.error("Error getting deliverable:", error);
      throw new Error("Failed to get deliverable");
    }
  }

  async getDeliverablesByOrderId(input: GetDeliverableInput): Promise<GetDeliverableOutput[]> {
    console.info("Querying deliverables for order:", input.orderId);
    try {
      const params = {
        TableName: Resource.Deliverables.tableName,
        KeyConditionExpression: "orderId = :orderId",
        ExpressionAttributeValues: {
          ":orderId": input.orderId
        }
      };
      
      const result = await this.dbClient.send(new QueryCommand(params));
      
      if (!result.Items || result.Items.length === 0) {
        return [];
      }
      return result.Items.map((item) => item as GetDeliverableOutput);
    } catch (error) {
      console.error("Error querying deliverables:", error);
      throw new Error("Failed to query deliverables");
    }
  }
}

export const createDeliverableRepository = (dbClient: DynamoDBDocumentClient): IDeliverableRepository => new DeliverableRepository(dbClient);