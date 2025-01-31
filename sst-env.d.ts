/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */

declare module "sst" {
  export interface Resource {
    "ApiKeys": {
      "name": string
      "type": "sst.aws.Dynamo"
    }
    "BackendApi": {
      "type": "sst.aws.ApiGatewayV2"
      "url": string
    }
    "ClerkClientPublishableKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "ClerkClientSecretKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "ClerkWebhookSecret": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "DLQ": {
      "type": "sst.aws.Queue"
      "url": string
    }
    "Deliverables": {
      "name": string
      "type": "sst.aws.Dynamo"
    }
    "EmailSequenceQueue": {
      "type": "sst.aws.Queue"
      "url": string
    }
    "GrowthStrategyQueue": {
      "type": "sst.aws.Queue"
      "url": string
    }
    "OpenAIApiKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "OrderManagerQueue": {
      "type": "sst.aws.Queue"
      "url": string
    }
    "OrderTopic": {
      "arn": string
      "type": "sst.aws.SnsTopic"
    }
    "Orders": {
      "name": string
      "type": "sst.aws.Dynamo"
    }
    "StripePriceId": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "StripeSecretKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "StripeWebhookSecret": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "TechStrategyQueue": {
      "type": "sst.aws.Queue"
      "url": string
    }
    "UnkeyApiId": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "UnkeyRootKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "Users": {
      "name": string
      "type": "sst.aws.Dynamo"
    }
    "ValueStrategyQueue": {
      "type": "sst.aws.Queue"
      "url": string
    }
    "WebsiteReview": {
      "name": string
      "type": "sst.aws.Dynamo"
    }
    "WebsiteReviewQueue": {
      "type": "sst.aws.Queue"
      "url": string
    }
  }
}
/// <reference path="sst-env.d.ts" />

import "sst"
export {}