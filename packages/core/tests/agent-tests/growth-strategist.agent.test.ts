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
    deliverableId: 'test_deliverable_123',
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
    expect(strategy.deliverableContent.sections.distributionChannels).toBeDefined();
    expect(strategy.deliverableContent.sections.customerJourney).toBeDefined();
    expect(strategy.deliverableContent.sections.firstTenCustomers).toBeDefined();
    expect(strategy.deliverableContent.sections.firstHundredCustomers).toBeDefined();
    expect(strategy.deliverableContent.sections.growthStrategies).toBeDefined();
  }, 100000);
}); 