import { 
  growthStrategyQueue, 
  valueStrategyQueue, 
  websiteReviewQueue, 
  techStrategyQueue, 
  emailSequenceQueue, 
  onboardUserQueue 
} from "./queues"


// Topics
export const orderTopic = new sst.aws.SnsTopic("OrderTopic", {
  fifo: true
})

export const taskTopic = new sst.aws.SnsTopic("TaskTopic", {
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

taskTopic.subscribeQueue(
  "onboarding",
   onboardUserQueue.arn,
  {
    filter: {
      "queue": ["onboarding"]
    }
  }
)