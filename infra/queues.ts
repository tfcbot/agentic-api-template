import { websiteReviewTable, deliverablesTable, ordersTable, usersTable } from "./database"
import { openaiApiKey, secrets, stripeSecretKey, unkeyApiId, unkeyRootKey, stripeWebhookSecret } from "./secrets"


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
    fifo: true,
    visibilityTimeout: "900 seconds"
})
export const valueStrategyQueue = new sst.aws.Queue("ValueStrategyQueue", {
    fifo: true,
    visibilityTimeout: "900 seconds"
})   
export const techStrategyQueue = new sst.aws.Queue("TechStrategyQueue", {
    fifo: true,
    visibilityTimeout: "900 seconds"
})
export const growthStrategyQueue = new sst.aws.Queue("GrowthStrategyQueue", {
    fifo: true,
    visibilityTimeout: "900 seconds"
})
export const emailSequenceQueue = new sst.aws.Queue("EmailSequenceQueue", {
    fifo: true,
    visibilityTimeout: "900 seconds"
})

export const orderManagerQueue = new sst.aws.Queue("OrderManagerQueue", {
    fifo: true,
    visibilityTimeout: "900 seconds"
})

export const onboardUserQueue = new sst.aws.Queue("OnboardUserQueue")

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
    ],
    timeout: "900 seconds"
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
    ],
    timeout: "900 seconds"
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
    timeout: "900 seconds"
})

emailSequenceQueue.subscribe({
    handler: "./packages/functions/src/agent-plane.api.emailSequenceHandler",
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
    timeout: "900 seconds"
})

onboardUserQueue.subscribe({
    handler: "./packages/functions/src/control-plane.api.onboardUserHandler",
    link: [
       usersTable,
       stripeSecretKey, 
       unkeyApiId,
       unkeyRootKey,
       stripeWebhookSecret
    ],
    permissions: [
        {
            actions: ["dynamodb:*"],
            resources: [usersTable.arn]
        }
    ]
})