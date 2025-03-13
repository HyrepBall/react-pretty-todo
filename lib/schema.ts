import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Необходимо заполнить").max(100, "До 100 символов"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});
export type TaskFormData = z.infer<typeof taskSchema>;
