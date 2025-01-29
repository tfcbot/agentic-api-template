import { DynamoDBDocumentClient, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { Deliverable } from "src/agent-plane/technical-strategist/metadata/technical-strategist.schema";

import { Resource } from "sst";

export interface IDeliverableRepository {
  saveDeliverable(deliverable: Deliverable): Promise<void>;
  getDeliverables(userId: string): Promise<Deliverable[]>;
}

class DeliverableRepository implements IDeliverableRepository {
  constructor(private dbClient: DynamoDBDocumentClient) {}

  async saveDeliverable(deliverable: Deliverable): Promise<void> {
    console.info("--- Saving Deliverable ---");
    try {
      const params = {
        TableName: Resource.Deliverables.tableName,
        Item: deliverable
      };
      await this.dbClient.send(new PutCommand(params));
    } catch (error) {
      console.error("Error saving deliverable:", error);
      throw new Error("Failed to save deliverable");
    }
  }

  async getDeliverables(userId: string): Promise<Deliverable[]> {
    console.info("Getting deliverables from database via DeliverableRepository");
    try {
      const params = {
        TableName: Resource.Deliverables.tableName,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId
        }
      };
      const result = await this.dbClient.send(new QueryCommand(params));
      return result.Items as Deliverable[];
    } catch (error) {
      console.error("Error getting deliverables:", error);
      throw new Error("Failed to get deliverables");
    }
  }
}

export const createDeliverableRepository = (dbClient: DynamoDBDocumentClient): IDeliverableRepository => 
        new DeliverableRepository(dbClient);
