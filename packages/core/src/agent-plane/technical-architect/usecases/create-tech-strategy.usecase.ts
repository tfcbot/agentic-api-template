import { RequestOnePageSpecInput, RequestOnePageSpecOutput } from '@agent-plane/technical-architect/metadata/technical-architect.schema'
import { runTechStrategy } from '@agent-plane/technical-architect/adapters/secondary/openai.adapter';

export const createTechStrategyUsecase = async (input: RequestOnePageSpecInput): Promise<RequestOnePageSpecOutput> => {
  console.info("Creating technical strategy for User: ", input.userId);

  try {
    const result = await runTechStrategy(input);
    
    return {
      spec: result
    };

  } catch (error) {
    console.error('Error generating technical strategy:', error);
    throw new Error('Failed to generate technical strategy');
  }
};
