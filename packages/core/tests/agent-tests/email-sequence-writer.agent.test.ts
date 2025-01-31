import { EmailSequenceInput, EmailSequenceOutput, EmailSequenceOutputSchema, PromptInput } from '@agent-plane/email-sequence-writer/metadata/email-sequence-writer.schema';
import { createEmailSequence, constructPrompt } from '@agent-plane/email-sequence-writer/adapters/secondary/openai.adapter';
// Mock SST Resource
jest.mock('sst', () => ({
  Resource: {
    OpenAIApiKey: { value: process.env.OPENAI_API_KEY }
  }
}));

describe('Email Sequence Writer Agent', () => {
  const testInput: PromptInput = {
    idealCustomerProfile: 'test-ideal-customer-profile',
    emailSequenceType: 'Onboarding Sequence',
  };

  it('should generate an email sequence', async () => {
    const prompt = constructPrompt(testInput);

    const result = await createEmailSequence(prompt);

    // Verify the sequence structure matches the schema
    expect(() => EmailSequenceOutputSchema.parse(result)).not.toThrow();
  
  }, 100000); // 100s timeout for OpenAI call
}); 