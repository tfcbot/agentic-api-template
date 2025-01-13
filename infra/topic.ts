import { growthStrategyQueue, valueStrategyQueue, websiteReviewQueue, techStrategyQueue } from "./queues"


// Topics
export const tasksTopic = new sst.aws.SnsTopic("TasksTopic")


// ... existing code ...
tasksTopic.subscribeQueue(
  "websiteReview", // Add name parameter
  websiteReviewQueue.arn, 
  {
      filter: {
          "queue": ["websiteReview"]
      }
  }
)


tasksTopic.subscribeQueue(
  "valueStrategy", 
  valueStrategyQueue.arn, 
  {
      filter: {
          "queue": ["valueStrategy"]
      }
  }
)

tasksTopic.subscribeQueue(
  "growthStrategy", 
  growthStrategyQueue.arn, 
  {
      filter: {
          "queue": ["growthStrategy"]
      }
  }
)

tasksTopic.subscribeQueue(
  "techStrategy", 
  techStrategyQueue.arn, 
  {
      filter: {
          "queue": ["techStrategy"]
      }
  }
)