import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Globe,
  Instagram,
  Facebook,
  ShoppingCart,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for a restaurant
const restaurantData = {
  id: "1",
  name: "Iya Togo's Kitchen",
  rating: 4.5,
  reviews: 120,
  description:
    "Experience the authentic taste of Nigerian cuisine at Iya Togo's Kitchen. Our dishes are prepared with love and tradition, bringing you the best flavors from across the country.",
  address: "123 Lagos Street, Victoria Island, Lagos",
  openingHours: "Mon-Sat: 11:00 AM - 10:00 PM, Sun: 12:00 PM - 9:00 PM",
  phone: "+234 123 456 7890",
  website: "www.iyatogoskitchen.com",
  instagram: "@iyatogoskitchen",
  facebook: "IyaTogosKitchen",
  cuisines: ["Nigerian", "West African", "Local"],
  imageUrl: "/heroImg.jpg",
  menu: [
    {
      category: "Soups",
      items: [
        {
          name: "Egusi Soup",
          image: "/heroImg.jpg",
          price: "₦1500",
          description: "Rich soup made with ground melon seeds and vegetables",
        },
        {
          name: "Efo Riro",
          image: "/heroImg.jpg",
          price: "₦1300",
          description: "Vegetable soup with assorted meat and fish",
        },
      ],
    },
    {
      category: "Main Dishes",
      items: [
        {
          name: "Jollof Rice",
          image: "/heroImg.jpg",
          price: "₦1200",
          description: "Spicy rice dish cooked in tomato sauce",
        },
        {
          name: "Pounded Yam with Egusi",
          image: "/heroImg.jpg",
          price: "₦1800",
          description: "Smooth yam paste served with egusi soup",
        },
      ],
    },
    {
      category: "Drinks",
      items: [
        {
            image: "/heroImg.jpg",
          name: "Chapman",
          price: "₦500",
          description:
            "Nigerian cocktail made with Fanta, Sprite, and other ingredients",
        },
        {
          name: "Zobo",
          image: "/heroImg.jpg",
          price: "₦300",
          description: "Refreshing drink made from hibiscus flowers",
        },
      ],
    },
  ],
};

export default function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");

  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const addToCart = (itemName: string) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemName]: (prevCart[itemName] || 0) + 1,
    }));
  };

  // In a real application, you would fetch the restaurant data based on the id
  // For now, we'll use the mock data
  const restaurant = restaurantData;

  return (
    <div className="px-4 py-8 mx-auto max-padd-container">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">{restaurant.name}</h1>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="ml-1 font-semibold">{restaurant.rating}</span>
          </div>
          <span className="text-gray-600">({restaurant.reviews} reviews)</span>
          {restaurant.cuisines.map((cuisine) => (
            <Badge key={cuisine} variant="secondary">
              {cuisine}
            </Badge>
          ))}
        </div>
        <p className="text-gray-600">{restaurant.description}</p>
      </div>

      <div className="mb-8">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="object-cover w-full h-64 rounded-lg"
        />
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="menu">Available Menu</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Restaurant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span>{restaurant.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span>{restaurant.openingHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-500" />
                <span>{restaurant.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-gray-500" />
                <a
                  href={`https://${restaurant.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {restaurant.website}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={`https://www.instagram.com/${restaurant.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:underline"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={`https://www.facebook.com/${restaurant.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="menu">
          <Card>
            <CardHeader>
              <CardTitle>Menu</CardTitle>
              <CardDescription>Explore our delicious offerings</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-8">
                  {restaurant.menu.map((category) => (
                    <Card key={category.category}>
                      <div className="md:flex">
                        <div className="md:w-2/3">
                          <CardHeader className="bg-green text-primary-foreground">
                            <CardTitle>{category.category}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-0">
                            {category.items.map((item, itemIndex) => (
                              <div key={item.name}>
                                <div className="p-4">
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="">
                                        <div className="flex items-center gap-3">

                                      <div className="">
                                        <img
                                        src={item.image}
                                          alt={`${category.category} category`}
                                          className="object-cover w-10 h-10 rounded-full"
                                        />
                                      </div>
                                      <h4 className="text-lg font-semibold">
                                        {item.name}
                                      </h4>

                                        </div>
                                      <p className="mt-2 text-sm text-muted-foreground">
                                        {item.description}
                                      </p>
                                    </div>
                                    <span className="font-bold text-primary">
                                      {item.price}
                                    </span>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => addToCart(item.name)}
                                  >
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    Add to Cart
                                    {cart[item.name] > 0 && (
                                      <span className="ml-2">
                                        ({cart[item.name]})
                                      </span>
                                    )}
                                  </Button>
                                </div>
                                {itemIndex < category.items.length - 1 && (
                                  <Separator />
                                )}
                              </div>
                            ))}
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
