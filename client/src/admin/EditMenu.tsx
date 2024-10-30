/* eslint-disable prefer-const */
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useMenuStore } from "@/store/useMenuStore"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
] as const

const menuSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0, "Price must be a positive number"),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Please select a valid category" })
  }),
  image: z.instanceof(File).optional(),
})

type MenuFormSchema = z.infer<typeof menuSchema>

interface EditMenuProps {
  selectedMenu: MenuFormSchema & { _id: string } | null
  editOpen: boolean
  setEditOpen: (open: boolean) => void
}

export default function EditMenu({ selectedMenu, editOpen, setEditOpen }: EditMenuProps) {
  const { loading, editMenu } = useMenuStore()

  const form = useForm<MenuFormSchema>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: categories[0],
    },
  })

  useEffect(() => {
    if (selectedMenu) {
      form.reset({
        name: selectedMenu.name,
        description: selectedMenu.description,
        price: selectedMenu.price,
        category: selectedMenu.category,
      })
    }
  }, [selectedMenu, form])

  const onSubmit = async (data: MenuFormSchema) => {
    try {
      console.log('Form Data:', data)
      
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("description", data.description)
      formData.append("price", data.price.toString())
      formData.append("category", data.category)
      if (data.image) {
        formData.append("image", data.image)
      }
      
      console.log('FormData entries:')
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`)
      }
      
      if (selectedMenu && selectedMenu._id) {
        await editMenu(selectedMenu._id, formData)
        setEditOpen(false)
      } else {
        console.error('No menu selected for editing')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  useEffect(() => {
    const subscription = form.watch((value) => {
      console.log('Form values changed:', value)
    })
    return () => subscription.unsubscribe()
  }, [form])

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Update your menu to keep your offerings fresh and exciting!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter menu name" {...field} />
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
                    <Textarea placeholder="Enter menu description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter menu price" 
                      {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Menu Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}