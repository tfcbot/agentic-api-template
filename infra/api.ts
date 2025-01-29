import { 
  usersTable,
  websiteReviewTable,
  ordersTable,
  deliverablesTable
 } from "./database";
import { 
  clerkWebhookSecret,
  clerkClientPublishableKey,
  clerkClientSecretKey,
  stripePriceId,
  stripeSecretKey,
  stripeWebhookSecret,
  secrets
 } from "./secrets";
import { orderTopic } from "./topic";

const BASE_DOMAIN = process.env.BASE_DOMAIN;

export const apiDomainName = $app.stage === "prod" 
  ? `api.${BASE_DOMAIN}`
  : `${$app.stage}-api.${BASE_DOMAIN}`;

export const appDomainName = $app.stage === "prod" 
  ? `app.${BASE_DOMAIN}`
  : `${$app.stage}-app.${BASE_DOMAIN}`; 


export const api = new sst.aws.ApiGatewayV2('BackendApi', {
    domain: {
      name: apiDomainName,
      path: "v1",
      dns: sst.cloudflare.dns({
        transform: {
          record: (record) => {
            if (record.name === apiDomainName  && record.type !== "CAA") {
              record.proxied = true;
              record.ttl = 1;
            }
          }
        }
      })
    }, 
    cors: {
      allowOrigins: [
        `https://${appDomainName}`,
        "http://localhost:3000",
      ]
    }
  }); 

const queues = []
const topics = [orderTopic]
const tables = [usersTable, websiteReviewTable, ordersTable, deliverablesTable]


const apiResources = [
  ...queues,
  ...topics,
  ...tables,
  ...secrets,
]

api.route("POST /checkout", {
  link: [...apiResources],
  handler: "./packages/functions/src/control-plane.api.checkout",
  environment: {
    STRIPE_SECRET_KEY: stripeSecretKey.value,
    REDIRECT_SUCCESS_URL: `https://${appDomainName}`,
    REDIRECT_FAILURE_URL: `https://${appDomainName}`,
    STRIPE_PRICE_ID: stripePriceId.value,
    CLERK_CLIENT_PUBLISHABLE_KEY: clerkClientPublishableKey.value,
    CLERK_CLIENT_SECRET_KEY: clerkClientSecretKey.value,
    CLERK_WEBHOOK_SECRET: clerkWebhookSecret.value,
  }, 
})

api.route("POST /checkout-webhook", {
  link: [...apiResources], 
  handler: "./packages/functions/src/control-plane.api.checkoutSessionWebhook", 
  environment: {
    STRIPE_WEBHOOK_SECRET: stripeWebhookSecret.value,
  }, 
})

api.route("POST /signup-webhook", {
  link: [...apiResources], 
  handler: "./packages/functions/src/control-plane.api.handleUserSignup", 
  timeout: "900 seconds"
})



api.route("POST /growth-strategy", {
  link: [...apiResources],
  handler: "./packages/functions/src/orchestrator.api.handleRequestGrowthStrategy",
  timeout: "900 seconds"
})

api.route("POST /value-strategy", {
  link: [...apiResources],
  handler: "./packages/functions/src/orchestrator.api.handleRequestValueStrategy",
  timeout: "900 seconds"
})

api.route("POST /tech-strategy", {
  link: [...apiResources],
  handler: "./packages/functions/src/orchestrator.api.handleRequestTechStrategy",
  timeout: "900 seconds"
})

api.route("GET /orders", {
  link: [...apiResources],
  handler: "./packages/functions/src/orchestrator.api.handleGetOrders",
  timeout: "900 seconds"
})

api.route("GET /orders/deliverables/{orderId}", {
  link: [...apiResources],
  handler: "./packages/functions/src/orchestrator.api.handleGetDeliverable",
  timeout: "900 seconds"
  })

api.route("GET /user/credits", {
  link: [...apiResources],
  handler: "./packages/functions/src/orchestrator.api.handleGetUserCredits",
  timeout: "900 seconds"
})

