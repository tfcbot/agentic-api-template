export const usersTable = new aws.dynamodb.Table("Users", {
    attributes: [
        {name: "userId", type: "S"}
    ],
    hashKey: "userId",
    billingMode: "PAY_PER_REQUEST",
    streamEnabled: true,
    streamViewType: "NEW_AND_OLD_IMAGES"
})

export const apiKeysTable = new aws.dynamodb.Table("ApiKeys", {
    attributes: [
        {name: "keyId", type: "S"}
    ],
    hashKey: "keyId",
    billingMode: "PAY_PER_REQUEST",
    streamEnabled: true,
    streamViewType: "NEW_IMAGE"
})

export const websiteReviewTable = new aws.dynamodb.Table("WebsiteReview", {
    attributes: [
        {name: "websiteId", type: "S"}
    ],
    hashKey: "websiteId",
    billingMode: "PAY_PER_REQUEST",
})

export const agentsTable = new aws.dynamodb.Table("Agents", {
    attributes: [
        {name: "agentId", type: "S"}
    ],
    hashKey: "agentId",
    billingMode: "PAY_PER_REQUEST",
})

export const ordersTable = new aws.dynamodb.Table("Orders", {
    attributes: [
        {name: "orderId", type: "S"},
        {name: "userId", type: "S"}
    ],
    hashKey: "orderId",
    billingMode: "PAY_PER_REQUEST",
    globalSecondaryIndexes: [
        {
            hashKey: "userId",
            name: "UserIdIndex",
            projectionType: "ALL"
        }
    ]
})

export const deliverablesTable = new aws.dynamodb.Table("Deliverables", {
    attributes: [
        {name: "deliverableId", type: "S"},
        {name: "orderId", type: "S"}
    ],
    hashKey: "deliverableId",
    billingMode: "PAY_PER_REQUEST",
    globalSecondaryIndexes: [
        {
            hashKey: "orderId",
            name: "OrderIdIndex",
            projectionType: "ALL"
        }
    ],
    streamEnabled: true,
    streamViewType: "NEW_AND_OLD_IMAGES"
})