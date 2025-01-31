import { growthStrategyQueue, valueStrategyQueue, websiteReviewQueue, techStrategyQueue, orderManagerQueue, emailSequenceQueue } from "./queues"


// Topics
export const orderTopic = new sst.aws.SnsTopic("OrderTopic", {
  fifo: true
})


// ... existing code ...
orderTopic.subscribeQueue(
  "websiteReview", // Add name parameter
  websiteReviewQueue.arn, 
  {
      filter: {
          "queue": ["websiteReview"]
      }
  }
)


orderTopic.subscribeQueue(
  "valueStrategy", 
  valueStrategyQueue.arn, 
  {
      filter: {
          "queue": ["valueStrategy"]
      }
  }
)

orderTopic.subscribeQueue(
  "growthStrategy", 
  growthStrategyQueue.arn, 
  {
      filter: {
          "queue": ["growthStrategy"]
      }
  }
)

orderTopic.subscribeQueue(
  "techStrategy", 
  techStrategyQueue.arn, 
  {
      filter: {
          "queue": ["techStrategy"]
      }, 
  }
)

orderTopic.subscribeQueue(
  "emailSequence", 
  emailSequenceQueue.arn, 
  {
      filter: {
          "queue": ["emailSequence"]
      }
  }
)
