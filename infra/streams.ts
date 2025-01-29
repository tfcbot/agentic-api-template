import {
    apiKeysTable,
    deliverablesTable,
    ordersTable,
    usersTable
} from "./database";
import { secrets } from "./secrets";




const onboardingStreamProcessor = new sst.aws.Function("OnboardingStreamProcessor", {
    handler: "./packages/functions/src/control-plane.api.handleOnboardingStream",
    link: [
        usersTable, 
        ...secrets
    ], 
    permissions: [
        {
            actions: ["dynamodb:*"],
            resources: [usersTable.streamArn]
        }, 

    ], 
    timeout: "900 seconds"
})


const onboardingStreamProcessorEventSourceMapping = new aws.lambda.EventSourceMapping("onboardingStreamProcessorEventSourceMapping", {
    eventSourceArn: usersTable.streamArn, 
    functionName: onboardingStreamProcessor.arn,
    batchSize: 100,
    maximumBatchingWindowInSeconds: 10,
    startingPosition: "LATEST"
})

const createApiKeyStreamProcessor = new sst.aws.Function("CreateApiKeyStreamProcessor", {
    handler: "./packages/functions/src/control-plane.api.createApiKeyStreamHandler",
    link: [usersTable,  apiKeysTable, ...secrets], 
    permissions: [
        {
            actions: ["dynamodb:*"],
            resources: [apiKeysTable.streamArn, usersTable.streamArn]
        }
    ], 
    timeout: "900 seconds"
})

const createApiKeyStreamProcessorEventSourceMapping = new aws.lambda.EventSourceMapping("createApiKeyStreamProcessorEventSourceMapping", {
    eventSourceArn: usersTable.streamArn, 
    functionName: createApiKeyStreamProcessor.arn,
    batchSize: 100,
    maximumBatchingWindowInSeconds: 10,
    startingPosition: "LATEST"
})




const apiKeyStreamProcessor = new sst.aws.Function("ApiKeyStreamProcessor", {
    handler: "./packages/functions/src/control-plane.api.updateTokenKeyIdStreamHandler",
    link: [apiKeysTable, ...secrets], 
    permissions: [
        {
            actions: ["dynamodb:*"],
            resources: [apiKeysTable.streamArn]
        }
    ], 
    timeout: "900 seconds"
})

const updateTokenKeyIdStreamProcessorEventSourceMapping = new aws.lambda.EventSourceMapping("updateTokenKeyIdStreamProcessorEventSourceMapping", {
    eventSourceArn: apiKeysTable.streamArn, 
    functionName: apiKeyStreamProcessor.arn,
    batchSize: 100,
    maximumBatchingWindowInSeconds: 10,
    startingPosition: "LATEST"
})

const processDeliverableStreamProcessor = new sst.aws.Function("ProcessDeliverableStreamProcessor", {
    handler: "./packages/functions/src/agent-plane.api.processDeliverableStreamHandler",
    link: [ordersTable, deliverablesTable, ...secrets], 
    permissions: [
        {
            actions: ["dynamodb:*"],
            resources: [ordersTable.arn, deliverablesTable.streamArn]
        }
    ], 
    timeout: "900 seconds"
})


const processDeliverableStreamProcessorEventSourceMapping = new aws.lambda.EventSourceMapping("processDeliverableStreamProcessorEventSourceMapping", {
    eventSourceArn: deliverablesTable.streamArn, 
    functionName: processDeliverableStreamProcessor.arn,
    batchSize: 100,
    maximumBatchingWindowInSeconds: 10,
    startingPosition: "LATEST"
})



export const streams = [
    onboardingStreamProcessor,
    createApiKeyStreamProcessor,
    apiKeyStreamProcessor
]

export const eventSourceMappings = [
   onboardingStreamProcessorEventSourceMapping,
    createApiKeyStreamProcessorEventSourceMapping,
    updateTokenKeyIdStreamProcessorEventSourceMapping

]