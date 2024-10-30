/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  restaurantFormSchema,
} from "@/schema/restaurantSchema";
import { z } from "zod";

type RestaurantFormValues = z.infer<typeof restaurantFormSchema>;

export default function RestaurantForm() {
  const { loading, restaurant, updateRestaurant, createRestaurant, getRestaurant } =
    useRestaurantStore();

  const form = useForm<RestaurantFormValues>({
    resolver: zodResolver(restaurantFormSchema),
    defaultValues: {
      restaurantName: "",
      rating: 0,
      reviews: 0,
      description: "",
      address: "",
      city: "",
      country: "",
      phone: "",
      openingHours: "",
      website: "",
      instagram: "",
      facebook: "",
      cuisines: [],
      deliveryTime: 30,
    },
  });

  const onSubmit = async (data: RestaurantFormValues) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "cuisines") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "imageFile" && value) {
          formData.append(key, value as Blob);
        } else {
          formData.append(key, String(value));
        }
      });

      if (restaurant) {
        await updateRestaurant(formData);
      } else {
        await createRestaurant(formData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const loadRestaurant = async () => {
      await getRestaurant();
      if (restaurant) {
        form.reset({
          ...restaurant,
          imageFile: undefined,
        });
      }
    };
    loadRestaurant();
  }, []);

  return (
    <Card className="max-w-4xl mx-auto my-8 mt-20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {restaurant ? "Edit Restaurant" : "Add New Restaurant"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="restaurantName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Restaurant Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter restaurant name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cuisines"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cuisines</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Italian, Chinese, Indian..."
                          value={field.value.join(", ")}
                          onChange={(e) =>
                            field.onChange(e.target.value.split(",").map((item) => item.trim()))
                          }
                        />
                      </FormControl>
                      <FormDescription>Separate cuisines with commas</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0-5"
                          min="0"
                          max="5"
                          step="0.1"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>Rating from 0 to 5</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reviews"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Reviews</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0"
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Time (minutes)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="30"
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>Average delivery time in minutes</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your restaurant..."
                          className="h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Location & Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Location & Contact</h3>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="openingHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opening Hours</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 9:00 AM - 10:00 PM" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Online Presence */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Online Presence</h3>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input placeholder="@username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook</FormLabel>
                      <FormControl>
                        <Input placeholder="facebook.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Restaurant Image</h3>
              <Separator />
              <FormField
                control={form.control}
                name="imageFile"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-4 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 800x400px)</p>
                          </div>
                          <Input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                onChange(file);
                              }
                            }}
                            {...field}
                          />
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </>
              ) : restaurant ? (
                "Update Restaurant"
              ) : (
                "Add Restaurant"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}