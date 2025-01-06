import { CheckoutSessionInput } from "@control-plane/billing/metadata/billing.schema";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { ClerkService } from "@utils/vendors/jwt-vendor";
import { MetadataRefill, MetadataRefillSchema } from "@utils/metadata/apikey.schema";

import { Resource } from "sst";
import { randomUUID } from "crypto";


const client = new DynamoDBClient({});
const dynamoClient = DynamoDBDocumentClient.from(client);
const Stripe = require('stripe');
const stripe = Stripe(Resource.StripeSecretKey.value);


export async function createSession(params: CheckoutSessionInput): Promise<{}> {
    const redirect_success_url = process.env.REDIRECT_SUCCESS_URL;
    const redirect_failure_url = process.env.REDIRECT_FAILURE_URL;
    const idempotencyKey = randomUUID();
    const metadataRefill: MetadataRefill = {
        keyId: params.keyId,
        interval: 'monthly',
        amount: "500",
        refillDay: "1"
    }
    try {
        const metadata = {
            userId: params.userId,
            ...metadataRefill
        }
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: Resource.PriceID.value,
                    quantity: params.quantity,
                },
            ],
            mode: 'subscription',
            success_url: redirect_success_url,
            cancel_url: redirect_failure_url,
            metadata: metadata
        }, {
            idempotencyKey: idempotencyKey // Pass the idempotency key in the request options
        });

        return { "id": session.id };
    } catch (error) {
        console.error("Error creating Stripe checkout session:", error);
        throw new Error("Failed to create Stripe checkout session");
    }
}
