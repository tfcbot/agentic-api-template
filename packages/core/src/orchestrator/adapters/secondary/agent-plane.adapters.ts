import { GetDeliverableInput, GetDeliverableOutput, GetOrdersInput, GetOrdersOutput, GetWebsiteReviewsInput, GetWebsiteReviewsOutput } from '@orchestrator/metadata/agent-plane.schema';
import {GetWebsiteReviewsAdapter} from "@agent-plane/website-reviewer/adapters/primary/get-website-reviews.adapter"
import { CreditsAdapter, creditsAdapter } from '@control-plane/billing/adapters/primary/get-remaining-credits.adapter';
import { GetRemainingCreditsOutput, GetRemainingCreditsInput } from '@control-plane/billing/metadata/credits.schema';
import { getOrdersAdapter, GetOrdersAdapter } from '@agent-plane/order-manager/adapters/primary/get-orders.adapter';
import { getDeliverableAdapter, GetDeliverableAdapter } from '@agent-plane/order-manager/adapters/primary/get-deliverable.adapter';
import { SaveOrderOutput, SaveOrderInput } from '@agent-plane/order-manager/metadata/order.schema';
import { SaveOrderAdapter, saveOrderAdapter } from '@agent-plane/order-manager/adapters/primary/save-order.adapter';

export interface IAgentPlaneAdapter {
  getWebsiteReviews(input: GetWebsiteReviewsInput): Promise<GetWebsiteReviewsOutput>;
  getRemainingCredits(input: GetRemainingCreditsInput): Promise<GetRemainingCreditsOutput>;
  getOrders(input: GetOrdersInput): Promise<GetOrdersOutput>;
  getDeliverable(input: GetDeliverableInput): Promise<GetDeliverableOutput>;
}

class AgentPlaneAdapter implements IAgentPlaneAdapter {
  private getWebsiteReviewsAdapter: GetWebsiteReviewsAdapter;
  private creditsAdapter: CreditsAdapter;
  private getOrdersAdapter: GetOrdersAdapter;
  private getDeliverableAdapter: GetDeliverableAdapter;
  private saveOrderAdapter: SaveOrderAdapter;


  constructor() {
    this.getWebsiteReviewsAdapter = new GetWebsiteReviewsAdapter();
    this.creditsAdapter = creditsAdapter;
    this.getOrdersAdapter = getOrdersAdapter;
    this.getDeliverableAdapter = getDeliverableAdapter;
    this.saveOrderAdapter = saveOrderAdapter;
  }


  async getWebsiteReviews(input: GetWebsiteReviewsInput): Promise<GetWebsiteReviewsOutput> {
    return this.getWebsiteReviewsAdapter.execute(input);
  }

  async getRemainingCredits(input: GetRemainingCreditsInput): Promise<GetRemainingCreditsOutput> {
    return this.creditsAdapter.getRemainingCredits(input);
  }

  async getOrders(input: GetOrdersInput): Promise<GetOrdersOutput> {
    return this.getOrdersAdapter.execute(input);
  }

  async getDeliverable(input: GetDeliverableInput): Promise<GetDeliverableOutput> {
    return this.getDeliverableAdapter.execute(input);
  }

  async saveOrder(input: SaveOrderInput): Promise<SaveOrderOutput> {
    return this.saveOrderAdapter.execute(input);
  }
}

export const agentPlaneAdapter = new AgentPlaneAdapter();
