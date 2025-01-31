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

export const websiteReviewTable = new sst.aws.Dynamo("WebsiteReview", {
    fields: {
        websiteId: "string"
    },
    primaryIndex: {hashKey: "websiteId"},
})

export const ordersTable = new sst.aws.Dynamo("Orders", {
    fields: {
        orderId: "string",
        userId: "string"
    },
    primaryIndex: {hashKey: "orderId"},
    globalIndexes: {
        UserIdIndex: {
            hashKey: "userId",
        }
    },
    stream: "new-and-old-images",
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