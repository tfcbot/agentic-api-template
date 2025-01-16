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
    problem: 'Fragmented team communication',
    applicationIdea: 'Business communication platform',
    idealCustomer: 'Enterprise software companies',
    solution: 'Integrated messaging and collaboration platform'
  };

  it('should generate a value strategy', async () => {
    const strategy = await runValueStrategy({
      ...testInput,
      userId: '123'
    });
    console.log(strategy);
    // Verify the strategy structure matches the schema
    expect(() => ValueStrategySchema.parse(strategy.deliverableContent)).not.toThrow();

    // Verify required sections
    expect(strategy.deliverableContent.value_proposition).toBeDefined();
    expect(strategy.deliverableContent.profit_proposition).toBeDefined();
    expect(strategy.deliverableContent.people_proposition).toBeDefined();
    expect(strategy.deliverableContent.core_benefit).toBeDefined();
    expect(strategy.deliverableContent.core_feature).toBeDefined();
    expect(strategy.deliverableContent.solution_overview).toBeDefined();
    expect(strategy.deliverableContent.benefit_breakdown).toBeDefined();
    expect(strategy.deliverableContent.first_order).toBeDefined();
    expect(strategy.deliverableContent.second_order).toBeDefined();
  }, 30000);
}); 