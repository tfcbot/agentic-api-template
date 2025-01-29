import { 
   checkoutSessionCompletedSchema,
   PaymentStatus
} from "@control-plane/billing/metadata/billing.schema";

import { checkoutSessionCompletedUseCase } from "@control-plane/billing/usecases/checkout-session-completed.usecase";
import { MetadataRefillSchema, UpdateApiKeyCommandSchema } from "@utils/metadata/apikey.schema";


import { Resource } from "sst";



const Stripe = require('stripe');
const stripe = Stripe(Resource.StripeSecretKey.value);
const stripeWebhookSecret = Resource.StripeWebhookSecret.value;

export const checkoutSessionWebhookAdapter = async (event: any) => {
    console.log("---Checkout session webhook adapter---");
    const signature = event.headers["stripe-signature"];
    let stripeEvent;
    try {
        stripeEvent = await stripe.webhooks.constructEvent(event.body, signature, stripeWebhookSecret);   
    } catch (err) {
        console.error(`⚠️  Webhook signature verification failed.` , err);
        return { statusCode: 400, body: "Invalid signature" };
    }
    const session = stripeEvent.data.object;
    switch (stripeEvent.type) {
        case "checkout.session.completed":
            console.log("---Update user plan with credits---");

            const metadataRefill = MetadataRefillSchema.parse(session.metadata);
            const updateApiKeyCommand = {
                keyId: metadataRefill.keyId,
                refill: {
                    interval: metadataRefill.interval,
                    amount: parseInt(metadataRefill.amount),
                    refillDay: parseInt(metadataRefill.refillDay)
                }
            };
            await checkoutSessionCompletedUseCase(updateApiKeyCommand);
            break;
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Webhook Event Received" }),
    };
}
