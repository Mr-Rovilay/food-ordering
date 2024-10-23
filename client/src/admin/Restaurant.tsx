import { useState } from 'react'
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'react-hot-toast'
import { Loader2, Plus } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

const menuItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  imageFile: z.instanceof(File).optional(),
  price: z.string().min(1, "Price is required"),
  description: z.string().min(1, "Description is required"),
})

const menuCategorySchema = z.object({
  category: z.string().min(1, "Category name is required"),
  items: z.array(menuItemSchema).min(1, "At least one item is required"),
})

const restaurantSchema = z.object({
  name: z.string().min(2, "Restaurant name must be at least 2 characters"),
  rating: z.number().min(0).max(5),
  reviews: z.number().int().nonnegative(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  openingHours: z.string().min(5, "Opening hours are required"),
  phone: z.string().min(5, "Phone number is required"),
  website: z.string().url("Must be a valid URL"),
  instagram: z.string().min(1, "Instagram handle is required"),
  facebook: z.string().min(1, "Facebook page name is required"),
  cuisines: z.array(z.string()).min(1, "At least one cuisine is required"),
  imageFile: z.instanceof(File).optional().refine((file) => file?.size !==0,{message: "Image file is required"}),
  menu: z.array(menuCategorySchema).min(1, "At least one menu category is required"),
})

type RestaurantFormValues = z.infer<typeof restaurantSchema>

export default function RestaurantForm() {
  const [loading, setLoading] = useState(false)

  const form = useForm<RestaurantFormValues>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      name: "",
      rating: 0,
      reviews: 0,
      description: "",
      address: "",
      openingHours: "",
      phone: "",
      website: "",
      instagram: "",
      facebook: "",
      cuisines: [],
      menu: [{ category: "", items: [{ name: "", price: "", description: "" }] }],
    },
  })

  const { fields: menuFields, append: appendMenu, remove: removeMenu } = useFieldArray({
    control: form.control,
    name: "menu",
  })

  const onSubmit: SubmitHandler<RestaurantFormValues> = async (data) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log(data)
      toast.success("Restaurant added successfully!")
      form.reset()
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl p-6 mx-auto my-10 bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-3xl font-extrabold">Add Restaurant</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
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
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" min="0" max="5" placeholder="Enter rating" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
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
                    <Input type="number" placeholder="Enter number of reviews" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter restaurant description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter restaurant address" {...field} />
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
                    <Input placeholder="Enter opening hours" {...field} />
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
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter website URL" {...field} />
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
                    <Input placeholder="Enter Instagram handle" {...field} />
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
                    <Input placeholder="Enter Facebook page name" {...field} />
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
                    <Input placeholder="Enter cuisines (comma-separated)" {...field} onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))} />
                  </FormControl>
                  <FormDescription>Separate multiple cuisines with commas</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageFile"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Upload Restaurant Banner</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => onChange(e.target.files?.[0])}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <Label className="text-lg font-semibold">Menu</Label>
            {menuFields.map((field, index) => (
              <Card key={field.id} className="mt-4">
                <CardContent className="pt-6">
                  <FormField
                    control={form.control}
                    name={`menu.${index}.category`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter category name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="mt-4">
                    <Label>Menu Items</Label>
                    {field.items.map((item, itemIndex) => (
                      <div key={item.id} className="p-4 mt-2 border rounded-md">
                        <FormField
                          control={form.control}
                          name={`menu.${index}.items.${itemIndex}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Item Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter item name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`menu.${index}.items.${itemIndex}.imageFile`}
                          render={({ field: { value, onChange, ...field } }) => (
                            <FormItem>
                              <FormLabel>Item Image</FormLabel>
                              <FormControl>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => onChange(e.target.files?.[0])}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`menu.${index}.items.${itemIndex}.price`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Item Price</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter item price" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`menu.${index}.items.${itemIndex}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Item Description</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Enter item description" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        const items = form.getValues(`menu.${index}.items`)
                        form.setValue(`menu.${index}.items`, [...items, { name: "", price: "", description: "" }])
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Item
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => appendMenu({ category: "", items: [{ name: "", price: "", description: "" }] })}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Menu Category
            </Button>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Please wait
              </>
            ) : (
              "Add Restaurant"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}