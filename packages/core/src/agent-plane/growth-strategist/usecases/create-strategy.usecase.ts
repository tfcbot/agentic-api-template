import { RequestOnePageGrowthInput, RequestOnePageGrowthOutput } from '@agent-plane/growth-strategist/metadata/growth-strategist.schema'
import { runGrowthStrategy } from '@agent-plane/growth-strategist/adapters/secondary/openai.adapter';

export const createStrategyUsecase = async (input: RequestOnePageGrowthInput): Promise<RequestOnePageGrowthOutput> => {
  console.info("Creating growth strategy for User: ", input.userId);

  try {
    const result = await runGrowthStrategy(input);
    
    return {
      strategy: result
    };

  } catch (error) {
    console.error('Error generating growth strategy:', error);
    throw new Error('Failed to generate growth strategy');
  }
};
