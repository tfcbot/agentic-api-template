import { 
   checkoutSessionCompletedSchema,
   PaymentStatus
} from "@control-plane/billing/metadata/billing.schema";
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
import { checkoutSessionCompletedUseCase } from "@control-plane/billing/usecases/checkout-session-completed.usecase";
import { UpdateApiKeyCommandSchema } from "@utils/metadata/apikey.schema";
export const checkoutSessionWebhookAdapter = async (event: any) => {
    console.log("---Checkout session webhook adapter---");
    const signature = event.headers["stripe-signature"];
    let stripeEvent;
    try {
        stripeEvent = await stripe.webhooks.constructEvent(event.body, signature, process.env.STRIPE_WEBHOOK_SECRET);   
    } catch (err) {
        console.error(`⚠️  Webhook signature verification failed.` , err);
        return { statusCode: 400, body: "Invalid signature" };
    }
    const session = stripeEvent.data.object;
    switch (stripeEvent.type) {
        case "checkout.session.completed":
            console.log("---Update user plan with credits---");
            const updateApiKeyCommand = UpdateApiKeyCommandSchema.parse(session.metadata);
            await checkoutSessionCompletedUseCase(updateApiKeyCommand);
            break;
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Webhook Event Received" }),
    };
}
