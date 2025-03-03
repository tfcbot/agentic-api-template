export const stripeSecretKey = new sst.Secret('StripeSecretKey')
export const stripeWebhookSecret = new sst.Secret('StripeWebhookSecret')
export const stripePriceId = new sst.Secret("StripePriceId")
export const clerkClientPublishableKey = new sst.Secret("ClerkClientPublishableKey")
export const clerkClientSecretKey = new sst.Secret("ClerkClientSecretKey")
export const clerkWebhookSecret = new sst.Secret("ClerkWebhookSecret")
export const openaiApiKey = new sst.Secret("OpenAIApiKey")
export const unkeyRootKey = new sst.Secret("UnkeyRootKey")
export const unkeyApiId = new sst.Secret("UnkeyApiId")

export const secrets = [
  stripeSecretKey,
  stripeWebhookSecret,
  stripePriceId,
  clerkClientPublishableKey,
  clerkClientSecretKey,
  clerkWebhookSecret,
  openaiApiKey,
  unkeyRootKey,
  unkeyApiId
]