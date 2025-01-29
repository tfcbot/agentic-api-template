import { SNSClient, PublishCommand } from "@aws-sdk/client-sns"
import { Order, Topic } from "@orchestrator/metadata/order.schema"


import { Resource } from "sst";

export class TopicPublisher {
  private snsClient: SNSClient;
  private topicArns: Record<Topic, string>;

  constructor() {
    this.snsClient = new SNSClient({});
    this.topicArns = {
      [Topic.orders]: Resource.OrderTopic.arn,
    };
  }

  async publishOrder(order: Order): Promise<void> {
    const topicArn = this.topicArns[order.topic];
    console.log("--- Publishing order to topic ---");
    try {
      await this.snsClient.send(new PublishCommand({
        TopicArn: topicArn,
        Message: JSON.stringify(order.payload),
        MessageAttributes: {
          queue: {
            DataType: 'String',
            StringValue: order.queue
          }
        }, 
        MessageGroupId: order.queue,
        MessageDeduplicationId: order.payload.orderId
      }));
    } catch (error) {
      console.error('Error publishing to topic:', error);
      throw new Error('Failed to publish to topic');
    }
  }
}

export const topicPublisher = new TopicPublisher();
