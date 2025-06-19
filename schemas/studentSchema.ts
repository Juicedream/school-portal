import {z} from "zod"

export const studentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  classLevel: z.enum(["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"]),
  compulsoryClub: z.string(),
  electiveClub: z.string().optional(),
});

export type StudentSchema = z.infer<typeof studentSchema>;