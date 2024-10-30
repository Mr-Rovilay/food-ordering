import { z } from "zod";

const categories = [
  "Appetizer",
  "Main Course",
  "Dessert",
  "Swallows",
  "Drinks",
  "Rice Dishes",
  "Soups",
  "Stews",
  "Grilled"
] as const;

export const menuSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0, "Price must be a positive number"),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Please select a valid category" })
  }),
  image: z
    .instanceof(File)
    .refine((file) => !file || file.size > 0, { message: "Image file is required" })
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      { message: "Image file must be 5MB or less" }
    )
});

export type MenuFormSchema = z.infer<typeof menuSchema>;