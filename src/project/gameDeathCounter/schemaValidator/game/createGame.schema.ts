import { z } from "zod";

export const createGameSchema = z.object({
	name: z.string().trim().min(1, "Name cannot be empty"),
});

export type CreateGameInput = z.infer<typeof createGameSchema>;
