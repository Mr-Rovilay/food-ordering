import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Globe,
  Instagram,
  Facebook,
  ShoppingCart,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRestaurantStore } from "@/store/useRestaurantStore"
import { MenuItem} from "@/types/restaurantType"
import { useCartStore } from "@/store/useCartStore"

export default function RestaurantDetail() {
  const { singleRestaurant, getSingleRestaurant } = useRestaurantStore()
  const [activeTab, setActiveTab] = useState("overview")
  const { addToCart } = useCartStore()
  const navigate = useNavigate()

  const params = useParams();

  useEffect(() => {
    getSingleRestaurant(params.id!); 
    
  }, [params.id]);


  if (!singleRestaurant) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl px-4 py-8 mx-auto mt-16">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">{singleRestaurant.restaurantName}</h1>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="ml-1 font-semibold">{singleRestaurant.rating}</span>
          </div>
          <span className="text-gray-600">({singleRestaurant.reviews} reviews)</span>
          {singleRestaurant.cuisines.map((cuisine) => (
            <Badge key={cuisine} variant="secondary">
              {cuisine}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-gray-600">{singleRestaurant.description}</p>
      </div>

      <div className="mb-8">
        <img
          src={singleRestaurant.imageUrl}
          alt={singleRestaurant.restaurantName}
          className="object-cover w-full h-64 rounded-lg"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
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
                <span>{singleRestaurant.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span>{singleRestaurant.openingHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-500" />
                <span>{singleRestaurant.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-gray-500" />
                <a
                  href={`https://${singleRestaurant.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {singleRestaurant.website}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={`https://www.instagram.com/${singleRestaurant.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:underline"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={`https://www.facebook.com/${singleRestaurant.facebook}`}
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
              <CardTitle>Available Menu</CardTitle>
              <CardDescription>Explore our delicious offerings</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-8">
                  {Object.entries(groupMenuItemsByCategory(singleRestaurant.menus)).map(([category, items]) => (
                    <Card key={category}>
                      <div className="md:flex">
                        <div className="md:w-full">
                          <CardHeader className="bg-green text-primary-foreground">
                            <CardTitle>{category}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-0">
                            {items.map((item, itemIndex) => (
                              <div key={item._id}>
                                <div className="p-4">
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <div className="flex items-center gap-3">
                                        <div>
                                          <img
                                            src={item.image}
                                            alt={item.name}
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
                                      ${item.price.toFixed(2)}
                                    </span>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => {
                                      addToCart(item);
                                      navigate("/cart");
                                    }}
                    
                                  >
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    Add to Cart
                                  </Button>   
                                </div>
                                {itemIndex < items.length - 1 && (
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
  )
}

function groupMenuItemsByCategory(menuItems: MenuItem[]): Record<string, MenuItem[]> {
  return menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, MenuItem[]>)
}