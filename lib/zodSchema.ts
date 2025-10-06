import { z } from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archived"] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." })
    .max(100, { message: "Title must be at most 100 characters long." }),

  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long." }),

  fileKey: z.string().min(3, { message: "File is required." }),

  price: z.coerce
    .number()
    .min(1, { message: "Price must be a positive number." }),

  duration: z.coerce
    .number()
    .min(1, { message: "Course duration must be at least 1 minute." })
    .max(500, { message: "Course duration must be at most 500 hours." }),

  level: z.enum(courseLevels, {
    message: "Level is required.",
  }),

  category: z.string().min(1, { message: "Category is required." }),

  smallDescription: z
    .string()
    .min(3, {
      message: "Small description must be at least 3 characters long.",
    })
    .max(200, {
      message: "Small description must be at most 200 characters long.",
    }),

  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long." })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must be URL friendly (only lowercase, numbers, and hyphens).",
    }),

  status: z.enum(courseStatus, {
    message: "Status is required.",
  }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
