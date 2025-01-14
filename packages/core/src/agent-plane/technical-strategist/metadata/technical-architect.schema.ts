import { z } from 'zod';

import mermaid from "mermaid";

// Create custom validators for Mermaid diagrams
const validateMermaid = async (value: string) => {
  try {
    await mermaid.parse(value);
    return true;
  } catch (error) {
    return false;
  }
};

export const TechStrategySchema = z.object({
  useCases: z.array(z.string()),
  nonFunctional: z.array(z.string()),
  dataModel: z.string().refine(
    async (val) => validateMermaid(val),
    { message: "Invalid Mermaid ERD diagram" }
  ),
  domainModel: z.string().refine(
    async (val) => validateMermaid(val),
    { message: "Invalid Mermaid class diagram" }
  ),
  servicesDesign: z.string().refine(
    async (val) => validateMermaid(val),
    { message: "Invalid Mermaid service diagram" }
  ),
  apiDesign: z.string(),
  deployment: z.string()
});



export const RequestOnePageSpecInputSchema = z.object({
  userId: z.string(),
  orderId: z.string(),
  useCases: z.string(),
  nonFunctional: z.string(),
});


export const RequestOnePageSpecOutputSchema = z.object({
  spec: z.string(),
});


export const DeliverableSchema = z.object({
  deliverableId: z.string().uuid(),
  deliverableContent: TechStrategySchema,
});

export const DeliverableDTOSchema = z.object({  
  userId: z.string(),
  deliverableId: z.string().uuid(),
  deliverableContent: TechStrategySchema,
});

export type RequestOnePageSpecInput = z.infer<typeof RequestOnePageSpecInputSchema>;
export type RequestOnePageSpecOutput = z.infer<typeof RequestOnePageSpecOutputSchema>;
export type Deliverable = z.infer<typeof DeliverableSchema>;
export type DeliverableDTO = z.infer<typeof DeliverableDTOSchema>;