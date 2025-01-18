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
      userId: '123',
      orderId: '123',
      deliverableId: '123'
    });
    console.log(strategy);
    // Verify the strategy structure matches the schema
    expect(() => ValueStrategySchema.parse(strategy.deliverableContent)).not.toThrow();

    // Verify required sections
    expect(strategy.deliverableContent.sections.valueProposition).toBeDefined();
    expect(strategy.deliverableContent.sections.profitProposition).toBeDefined();
    expect(strategy.deliverableContent.sections.peopleProposition).toBeDefined();
    expect(strategy.deliverableContent.sections.coreBenefit).toBeDefined();
    expect(strategy.deliverableContent.sections.coreFeature).toBeDefined();
    expect(strategy.deliverableContent.sections.solutionOverview).toBeDefined();
    expect(strategy.deliverableContent.sections.benefitBreakdown).toBeDefined();
    expect(strategy.deliverableContent.sections.firstOrder).toBeDefined();
      expect(strategy.deliverableContent.sections.secondOrder).toBeDefined();
  }, 100000);
}); 