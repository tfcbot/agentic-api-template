import { websiteReviewQueue } from "./queues"


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