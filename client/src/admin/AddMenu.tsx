/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Edit2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EditMenu from "./EditMenu";
import { menuSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { MenuItem } from "@/types/restaurantType";


const categories = ["Appetizer", "Main Course", "Dessert", "Swallows", "Drinks", "Rice Dishes", "Soups", "Stews", "Grilled"] as const;

type MenuFormValues = {
  name: string;
  description: string;
  price: number;
  category: typeof categories[number];
  image?: File;
}

export default function AddMenu() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const { loading, createMenu } = useMenuStore();
  const { restaurant } = useRestaurantStore();

  const form = useForm<MenuFormValues>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "Main Course",
      image: undefined,
    },
  });

  const onSubmit = async (data: MenuFormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("category", data.category);
      if (data.image) {
        formData.append("image", data.image);
      }
      await createMenu(formData);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error creating menu:", error);
    }
  };

  return (
    <div className="max-w-6xl px-4 mx-auto my-10">
      <div className="flex items-center justify-between mt-20 mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Available Menus</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Menu
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add A New Menu</DialogTitle>
              <DialogDescription>
                Create a menu that will make your restaurant stand out.
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
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  {loading ? (
                    <Button disabled>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button className="">
                      Submit
                    </Button>
                  )}
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {restaurant?.menus.map((menu) => (
          <Card key={menu._id}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={menu.image || "/placeholder.svg?height=96&width=96"}
                  alt={menu.name}
                  className="object-cover w-24 h-24 rounded-md"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{menu.name}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">{menu.description}</p>
                  <p className="mt-1 text-sm text-gray-500">{menu.category}</p>
                  <p className="mt-2 font-semibold text-primary">₦{menu.price.toFixed(2)}</p>
                </div>
              </div>
              <Button
                onClick={() => {
                  setSelectedMenu(menu);
                  setEditOpen(true);
                }}
                size="sm"
                className="w-full mt-4"
                variant="outline"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <EditMenu selectedMenu={selectedMenu as any} editOpen={editOpen} setEditOpen={setEditOpen} />
    </div>
  );
}