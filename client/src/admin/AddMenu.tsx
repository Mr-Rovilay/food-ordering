import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import EditMenu from "./EditMenu";

const menuFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0, "Price must be a positive number"),
  image: z.instanceof(File).optional(),
});

type MenuFormSchema = z.infer<typeof menuFormSchema>;

interface Menu extends MenuFormSchema {
    id: string;
    image?: File; // Changed from string to File | undefined
  }

const mockMenus: Menu[] = [
  {
    id: "1",
    name: "Spicy Chicken Burger",
    description: "Juicy chicken patty with a spicy kick, fresh veggies, and our secret sauce.",
    price: 12.99,
    image: undefined, // Changed from string to undefined
  },
  {
    id: "2",
    name: "Vegetarian Pizza",
    description: "Loaded with fresh vegetables, mozzarella cheese, and our homemade tomato sauce.",
    price: 14.99,
    image: undefined, // Changed from string to undefined
  },
];

export default function AddMenu() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [menus, setMenus] = useState<Menu[]>(mockMenus);

  const form = useForm<MenuFormSchema>({
    resolver: zodResolver(menuFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  const onSubmit = async (data: MenuFormSchema) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newMenu: Menu = {
      ...data,
      id: Date.now().toString(),
      image: data.image, // Keep as File | undefined
    };
    setMenus([...menus, newMenu]);
    setOpen(false);
    form.reset();
  };

  return (
    <div className="max-w-6xl px-4 mx-auto my-10">
      <div className="flex items-center justify-between mb-6">
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
                        <Input type="number" placeholder="Enter menu price" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
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
                      <FormControl >
                        <Input  type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
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
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {menus.map((menu) => (
          <Card key={menu.id}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={menu.image ? URL.createObjectURL(menu.image) : undefined} // Convert File to URL
                  alt={menu.name}
                  className="object-cover w-24 h-24 rounded-md"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{menu.name}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">{menu.description}</p>
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
      {/* Placeholder for EditMenu component */}
      <EditMenu selectedMenu={selectedMenu} editOpen={editOpen} setEditOpen={setEditOpen} />
    </div>
  );
}
