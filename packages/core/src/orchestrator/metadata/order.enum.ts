import { UUID } from "crypto";




export enum AgentCost {
    GrowthStrategy = 20,
    ValueStrategy = 20,
    TechStrategy = 20,
    EmailSequence = 50
}

export enum Status {
    Pending = 'Pending',
    InProgress = 'InProgress',
    Completed = 'Completed',
    Failed = 'Failed',
}

export enum Queue {
    content = 'content',
}

export enum Topic {
    orders = 'orders',
}