import { ValueStrategySchema } from '@agent-plane/value-strategist/metadata/value-strategist.schema';
import { runValueStrategy } from '@agent-plane/value-strategist/adapters/secondary/openai.adapter';

// Mock SST Resource
jest.mock('sst', () => ({
  Resource: {
    OpenAIApiKey: { value: process.env.OPENAI_API_KEY }
  }
}));

describe('Value Strategist Agent', () => {
  const testInput = {
    userId: 'test_user_123',
    orderId: 'test_order_123',
    businessModel: 'SaaS subscription',
    targetMarket: 'Enterprise software companies',
    competitorAnalysis: 'Main competitors include Slack and Microsoft Teams'
  };

  it('should generate a value strategy', async () => {
    const strategy = await runValueStrategy(testInput);

    // Verify the strategy structure matches the schema
    expect(() => ValueStrategySchema.parse(strategy.deliverableContent)).not.toThrow();

    // Verify required sections
    expect(strategy.deliverableContent.valueProposition).toBeDefined();
    expect(strategy.deliverableContent.pricingStrategy).toBeDefined();
    expect(strategy.deliverableContent.marketPositioning).toBeDefined();
    expect(strategy.deliverableContent.competitiveAdvantages).toBeDefined();
    expect(strategy.deliverableContent.revenueModel).toBeDefined();
  }, 30000);
}); 