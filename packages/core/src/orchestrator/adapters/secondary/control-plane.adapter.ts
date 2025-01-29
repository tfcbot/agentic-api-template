import { GetRemainingCreditsOutput, GetRemainingCreditsInput, UpdateRemainingCreditsInput } from '@control-plane/billing/metadata/credits.schema';
import { CreditsAdapter, creditsAdapter } from '@control-plane/billing/adapters/primary/get-remaining-credits.adapter';
import { UpdateCreditsAdapter, updateCreditsAdapter } from '@control-plane/billing/adapters/primary/update-remaining-credits.adater';


export interface IControlPlaneAdapter {
  getRemainingCredits(input: GetRemainingCreditsInput): Promise<GetRemainingCreditsOutput>;
}

class ControlPlaneAdapter implements IControlPlaneAdapter {
  private creditsAdapter: CreditsAdapter;
  private updateCreditsAdapter: UpdateCreditsAdapter;

  constructor() {
    this.creditsAdapter = creditsAdapter;
    this.updateCreditsAdapter = updateCreditsAdapter;
  }

  async getRemainingCredits(input: GetRemainingCreditsInput): Promise<GetRemainingCreditsOutput> {
    return this.creditsAdapter.getRemainingCredits(input);
  }

  async updateRemainingCredits(input: UpdateRemainingCreditsInput): Promise<void> {
    await this.updateCreditsAdapter.updateRemainingCredits(input);
  }
}

export const controlPlaneAdapter = new ControlPlaneAdapter();
