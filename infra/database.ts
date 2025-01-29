export const usersTable = new sst.aws.Dynamo("Users", {
    fields: {
        userId: "string"
    },
    primaryIndex: {hashKey: "userId"},
    stream: "new-and-old-images",
})


export const apiKeysTable = new sst.aws.Dynamo("ApiKeys", {
    fields: {
        keyId: "string"
    },
    primaryIndex: {hashKey: "keyId"},
    stream: "new-and-old-images",
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

export const deliverablesTable = new sst.aws.Dynamo("Deliverables", {
    fields: {
        deliverableId: "string",
        orderId: "string"
    },
    primaryIndex: {hashKey: "deliverableId"},
    globalIndexes: {
        OrderIdIndex: {
            hashKey: "orderId",
        }
    },
    stream: "new-and-old-images",
})