import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { EmailSequenceOutput, DeliverableDTO } from "../../metadata/email-sequence-writer.schema";
import { Resource } from "sst";

export interface IDeliverableRepository {
  saveDeliverable(deliverable: DeliverableDTO): Promise<void>;
  getDeliverable(deliverableId: string): Promise<EmailSequenceOutput>;
}

class DeliverableRepository implements IDeliverableRepository {
  constructor(private dbClient: DynamoDBDocumentClient) {}

  async saveDeliverable(deliverable: DeliverableDTO): Promise<void> {
    console.info("--- Saving Email Sequence Deliverable ---");
    try {

      const params = {
        TableName: Resource.Deliverables.name,
        Item: deliverable
      };
      
      await this.dbClient.send(new PutCommand(params));
    } catch (error) {
      console.error("Error saving email sequence deliverable:", error);
      throw new Error("Failed to save email sequence deliverable");
    }
  }

  async getDeliverable(deliverableId: string): Promise<EmailSequenceOutput> {
    console.info("Getting email sequence deliverable from database");
    try {
      const params = {
        TableName: Resource.Deliverables.name,
        Key: { deliverableId }
      };
      
      const result = await this.dbClient.send(new GetCommand(params));
      
      if (!result.Item) {
        throw new Error("Deliverable not found");
      }

      return JSON.parse(result.Item.content);
    } catch (error) {
      console.error("Error getting email sequence deliverable:", error);
      throw new Error("Failed to get email sequence deliverable");
    }
  }
}

export const createDeliverableRepository = (dbClient: DynamoDBDocumentClient): IDeliverableRepository => 
  new DeliverableRepository(dbClient); 