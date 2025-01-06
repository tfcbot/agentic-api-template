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