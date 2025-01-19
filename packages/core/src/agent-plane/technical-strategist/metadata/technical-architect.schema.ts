import { z } from 'zod';

// Simple validator that checks for basic mermaid syntax
const validateMermaid = (value: string): boolean => {
  // Check if string starts with a valid mermaid diagram type
  const validDiagramTypes = [
    'erDiagram',
    'classDiagram',
    'sequenceDiagram',
    'flowchart',
    'graph'
  ];
  
  const firstLine = value.trim().split('\n')[0].trim();
  return validDiagramTypes.some(type => firstLine.startsWith(type));
};

export const TechStrategySchema = z.object({
  sections: z.object({
    useCases: z.object({
      id: z.string(),
      label: z.string(),
      type: z.literal('list'),
      description: z.string().optional(),
      data: z.array(z.string())
    }),
    nonFunctional: z.object({
      id: z.string(), 
      label: z.string(),
      type: z.literal('list'),
      description: z.string().optional(),
      data: z.array(z.string())
    }),
    dataModel: z.object({
      id: z.string(),
      label: z.string(), 
      type: z.literal('diagram'),
      description: z.string().optional(),
      data: z.string().refine(
        (val) => validateMermaid(val),
        { message: "Invalid Mermaid ERD diagram" }
      )
    }),
    domainModel: z.object({
      id: z.string(),
      label: z.string(),
      type: z.literal('diagram'),
      description: z.string().optional(),
      data: z.string().refine(
        (val) => validateMermaid(val),
        { message: "Invalid Mermaid class diagram" }
      )
    }),
    servicesDesign: z.object({
      id: z.string(),
      label: z.string(),
      type: z.literal('diagram'),
      description: z.string().optional(),
      data: z.string().refine(
        (val) => validateMermaid(val),
        { message: "Invalid Mermaid service diagram" }
      )
    }),
    apiDesign: z.object({
      id: z.string(),
      label: z.string(),
      type: z.literal('text'),
      description: z.string().optional(),
      data: z.string()
    }),
    deployment: z.object({
      id: z.string(),
      label: z.string(),
      type: z.literal('text'),
      description: z.string().optional(),
      data: z.string()
    })
  })
});

export const BasePayloadSchema = z.object({
  userId: z.string(),
  orderId: z.string(),
  deliverableId: z.string(),
  deliverableName: z.string(),
});

export const RequestTechStrategyInputSchema = BasePayloadSchema.extend({
  useCases: z.string(),
  nonFunctional: z.string(),
});


export const RequestTechStrategyOutputSchema = z.object({
  spec: z.string(),
});


export const DeliverableSchema = z.object({
  deliverableContent: TechStrategySchema,
});

export const DeliverableDTOSchema = BasePayloadSchema.extend({
  deliverableContent: TechStrategySchema,
});

export type RequestTechStrategyInput = z.infer<typeof RequestTechStrategyInputSchema>;
export type RequestTechStrategyOutput = z.infer<typeof RequestTechStrategyOutputSchema>;
export type Deliverable = z.infer<typeof DeliverableSchema>;
export type DeliverableDTO = z.infer<typeof DeliverableDTOSchema>;
