<<<<<<< Updated upstream
import { GetWebsiteReviewsInput, GetWebsiteReviewsOutput } from '@orchestrator/metadata/agent-plane.schema';
import {GetWebsiteReviewsAdapter} from "@agent-plane/website-reviewer/adapters/primary/get-website-reviews.adapter"
import { CreditsAdapter, creditsAdapter } from '@control-plane/billing/adapters/primary/get-remaining-credits.adapter';
import { GetRemainingCreditsOutput, GetRemainingCreditsInput } from '@control-plane/billing/metadata/credits.schema';


export interface IAgentPlaneAdapter {
  getWebsiteReviews(input: GetWebsiteReviewsInput): Promise<GetWebsiteReviewsOutput>;
=======
import { GetAgentsInput, GetAgentsOutput } from '@orchestrator/metadata/agent.schema';
import { ReviewWebsiteInput, ReviewWebsiteOutput } from '@orchestrator/metadata/agent.schema';
import { GetWebsiteReviewsInput, GetWebsiteReviewsOutput } from '@orchestrator/metadata/agent.schema';
import { GetRemainingCreditsInput, GetRemainingCreditsOutput } from '@orchestrator/metadata/agent.schema';
import {GetAgentsAdapter } from "@agent-plane/adapters/primary/get-agents.adapter"
import {ReviewWebsiteAdapter} from "@agent-plane/adapters/primary/review-website.adapter"
import {GetWebsiteReviewsAdapter} from "@agent-plane/adapters/primary/get-website-rewiews.adapter"
import { userAdapter } from '@control-plane/user/adapters/primary/get-remaining-credits';
import { IUserAdapter } from '@orchestrator/metadata/user.schema';

export interface IAgentPlaneAdapter {
  getAgents(getAgentsInput: GetAgentsInput): Promise<GetAgentsOutput[]>;
  reviewWebsite(input: ReviewWebsiteInput): Promise<ReviewWebsiteOutput[]>;
  getWebsiteReviews(input: GetWebsiteReviewsInput): Promise<GetWebsiteReviewsOutput[]>;
>>>>>>> Stashed changes
  getRemainingCredits(input: GetRemainingCreditsInput): Promise<GetRemainingCreditsOutput>;
}

class AgentPlaneAdapter implements IAgentPlaneAdapter {
<<<<<<< Updated upstream
  private getWebsiteReviewsAdapter: GetWebsiteReviewsAdapter;
  private creditsAdapter: CreditsAdapter;

  constructor() {
    this.getWebsiteReviewsAdapter = new GetWebsiteReviewsAdapter();
    this.creditsAdapter = creditsAdapter;
  }


  async getWebsiteReviews(input: GetWebsiteReviewsInput): Promise<GetWebsiteReviewsOutput> {
=======
  private getAgentsAdapter: GetAgentsAdapter;
  private reviewWebsiteAdapter: ReviewWebsiteAdapter;
  private getWebsiteReviewsAdapter: GetWebsiteReviewsAdapter;
  private userAdapter: IUserAdapter;

  constructor() {
    this.getAgentsAdapter = new GetAgentsAdapter();
    this.reviewWebsiteAdapter = new ReviewWebsiteAdapter();
    this.getWebsiteReviewsAdapter = new GetWebsiteReviewsAdapter();
    this.userAdapter = userAdapter;
  }

  async getAgents(input: GetAgentsInput): Promise<GetAgentsOutput[]> {  
    return this.getAgentsAdapter.execute(input);
  }

  async reviewWebsite(input: ReviewWebsiteInput): Promise<ReviewWebsiteOutput[]> {
    return this.reviewWebsiteAdapter.execute(input);
  }

  async getWebsiteReviews(input: GetWebsiteReviewsInput): Promise<GetWebsiteReviewsOutput[]> {
>>>>>>> Stashed changes
    return this.getWebsiteReviewsAdapter.execute(input);
  }

  async getRemainingCredits(input: GetRemainingCreditsInput): Promise<GetRemainingCreditsOutput> {
<<<<<<< Updated upstream
    return this.creditsAdapter.getRemainingCredits(input);
=======
    return this.userAdapter.getRemainingCredits(input);
>>>>>>> Stashed changes
  }
}

export const agentPlaneAdapter = new AgentPlaneAdapter();
