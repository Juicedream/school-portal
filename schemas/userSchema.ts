import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["admin", "teacher", "student"]),
});

export type UserSchema = z.infer<typeof userSchema>;
