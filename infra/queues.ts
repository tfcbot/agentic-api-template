import { websiteReviewTable, deliverablesTable, ordersTable } from "./database"
import { openaiApiKey, secrets } from "./secrets"


const subscriberRole = new aws.iam.Role("QueueSubscriberRole", {
    assumeRolePolicy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
            {
                Effect: "Allow",
                Principal: {
                    Service: "lambda.amazonaws.com"
                },
                Action: "sts:AssumeRole"
            }
        ]
    }),
});

new aws.iam.RolePolicy("QueueSubscriberPolicy", {
    role: subscriberRole.id,
    policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
            {
                Effect: "Allow",
                Action: [
                    "bedrock:InvokeAgent",
                    "lambda:InvokeFunction",
                    "sqs:SendMessage",
                    "sqs:ReceiveMessage",
                    "sqs:DeleteMessage",
                    "sqs:GetQueueAttributes",
                    "sqs:GetQueueUrl",
                    "dynamodb:PutItem",
                    "dynamodb:GetItem",
                    "dynamodb:UpdateItem"
                ],
                Resource: ["*"]
            }
        ]
    }),
});


export const DLQ = new sst.aws.Queue("DLQ")
export const websiteReviewQueue = new sst.aws.Queue("WebsiteReviewQueue", {
    fifo: true
})
export const valueStrategyQueue = new sst.aws.Queue("ValueStrategyQueue", {
    fifo: true
})   
export const techStrategyQueue = new sst.aws.Queue("TechStrategyQueue", {
    fifo: true
})
export const growthStrategyQueue = new sst.aws.Queue("GrowthStrategyQueue", {
    fifo: true
})

export const orderManagerQueue = new sst.aws.Queue("OrderManagerQueue", {
    fifo: true
})

    
websiteReviewQueue.subscribe({
        handler: "./packages/functions/src/agent-plane.api.websiteReviewHandler", 
        link: [
           websiteReviewTable, 
           openaiApiKey
        ],
        permissions: [
            {
                actions: ["dynamodb:*"], 
                resources: [websiteReviewTable.arn]
            }
        ]
    }, 
)


valueStrategyQueue.subscribe({
    handler: "./packages/functions/src/agent-plane.api.valueStrategyHandler", 
    link: [
        deliverablesTable, 
        ordersTable, 
        openaiApiKey, 
    ], 
    permissions: [
        {
            actions: ["dynamodb:*"], 
            resources: [deliverablesTable.arn, ordersTable.arn]
        }
    ]
})

techStrategyQueue.subscribe({
    handler: "./packages/functions/src/agent-plane.api.techStrategyHandler", 
    link: [
        deliverablesTable, 
        ordersTable, 
        openaiApiKey
    ], 
    permissions: [
        {
            actions: ["dynamodb:*"], 
            resources: [deliverablesTable.arn, ordersTable.arn]
        }
    ]
})

growthStrategyQueue.subscribe({
    handler: "./packages/functions/src/agent-plane.api.growthStrategyHandler", 
    link: [
        deliverablesTable, 
        ordersTable, 
        openaiApiKey
    ], 
    permissions: [
        {
            actions: ["dynamodb:*"], 
            resources: [deliverablesTable.arn, ordersTable.arn]
        }
    ], 
})

