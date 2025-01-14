import { GrowthStrategySchema } from '@agent-plane/growth-strategist/metadata/growth-strategist.schema';
import { runGrowthStrategy } from '@agent-plane/growth-strategist/adapters/secondary/openai.adapter';

// Mock SST Resource
jest.mock('sst', () => ({
  Resource: {
    OpenAIApiKey: { value: process.env.OPENAI_API_KEY }
  }
}));

describe('Growth Strategist Agent', () => {
  const testInput = {
    userId: 'test_user_123',
    orderId: 'test_order_123',
    applicationIdea: 'A SaaS platform for managing remote teams',
    idealCustomer: 'Small to medium-sized tech companies',
    targetAnnualRevenue: 1000000
  };

  it('should generate a growth strategy', async () => {
    const strategy = await runGrowthStrategy(testInput);
    console.log(strategy);
    // Verify the strategy structure matches the schema
    expect(() => GrowthStrategySchema.parse(strategy.deliverableContent)).not.toThrow();

    // Verify required sections
    expect(strategy.deliverableContent.distributionChannels).toBeDefined();
    expect(strategy.deliverableContent.customerJourney).toBeDefined();
    expect(strategy.deliverableContent.firstTenCustomers).toBeDefined();
    expect(strategy.deliverableContent.firstHundredCustomers).toBeDefined();
    expect(strategy.deliverableContent.growthStrategies).toBeDefined();
  }, 30000);
}); 