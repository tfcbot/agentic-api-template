import { DeliverableSchema } from '@agent-plane/technical-strategist/metadata/technical-architect.schema';
import { runTechStrategy } from '@agent-plane/technical-strategist/adapters/secondary/openai.adapter';

// Mock SST Resource
jest.mock('sst', () => ({
  Resource: {
    OpenAIApiKey: { value: process.env.OPENAI_API_KEY }
  }
}));

describe('Technical Strategist Agent', () => {
  const testInput = {
    userId: 'test_user_123',
    orderId: 'test_order_123',
    useCases: 'User authentication, real-time chat, file sharing',
    nonFunctional: 'High availability, scalable to 10k users, GDPR compliant'
  };

  it('should generate a technical strategy', async () => {
    const strategy = await runTechStrategy(testInput);
    console.log(strategy);
    // Verify the strategy structure matches the schema
    expect(() => DeliverableSchema.parse(strategy)).not.toThrow();

    // Verify the strategy contains required sections
    expect(strategy.deliverableId).toBeDefined();
    expect(strategy.deliverableContent).toBeDefined();
  }, 90000);
}); 