import { RequestOnePageValueInput, RequestOnePageValueOutput } from '@agent-plane/value-strategist/metadata/value-strategist.schema'
import { runValueStrategy } from '@agent-plane/value-strategist/adapters/secondary/openai.adapter';

export const createValueSpecUsecase = async (input: RequestOnePageValueInput): Promise<RequestOnePageValueOutput> => {
  console.info("Creating value strategy for User: ", input.userId);

  try {
    const result = await runValueStrategy(input);
    
    return {
      value: result
    };

  } catch (error) {
    console.error('Error generating value strategy:', error);
    throw new Error('Failed to generate value strategy');
  }
};
