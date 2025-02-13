import { Queue, Topic } from "./order.schema";
import { z } from "zod";

import { OnboardUserInputSchema } from "./user.schema";


export const TaskSchema = z.object({
   topic: z.nativeEnum(Topic),
   queue: z.nativeEnum(Queue),
   payload: z.object({
      taskId: z.string(),
      userId: z.string(),
   })
})

export const OnboardingTaskSchema = TaskSchema.extend({
   payload: OnboardUserInputSchema,
});


export type Task = z.infer<typeof TaskSchema>
export type OnboardingTask = z.infer<typeof OnboardingTaskSchema>


export type TaskType =
   | OnboardingTask



