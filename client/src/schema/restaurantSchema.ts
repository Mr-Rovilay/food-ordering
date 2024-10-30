import { z } from "zod";

export const restaurantFormSchema = z.object({
    restaurantName: z.string().min(2, "Restaurant name must be at least 2 characters"),
    city: z.string().nonempty({ message: "City is required" }),
    country: z.string().nonempty({ message: "Country is required" }),
    deliveryTime: z.number().min(0, { message: "Delivery time cannot be negative" }),
    rating: z.number().min(0).max(5),
    reviews: z.number().int().nonnegative(),
    description: z.string().min(10, "Description must be at least 10 characters"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    openingHours: z.string().min(5, "Opening hours are required"),
    phone: z.string().min(5, "Phone number is required"),
    website: z.string().optional().refine((data) => data ? data.startsWith('http://') || data.startsWith('https://') : true, { message: "Must be a valid URL" }),
    instagram: z.string().optional(),  // Optional field
    facebook: z.string().optional(),   // Optional field
    cuisines: z.array(z.string()).min(1, "At least one cuisine is required"),
    imageFile: z.instanceof(File).optional().refine((file) => file?.size !== 0, { message: "Image file is required" }),
});

export type RestaurantFormSchema = z.infer<typeof restaurantFormSchema>;
