import { useState } from "react"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Globe, MapPin, Search, X } from "lucide-react"
import FilterPage from "./FilterPage";

type Restaurant = {
  id: string
  name: string
  city: string
  country: string
  cuisines: string[]
  featured: boolean
  imageUrl: string
}

const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: "1",
    name: "Iya Togo's Kitchen",
    city: "Lagos",
    country: "Nigeria",
    cuisines: ["Local", "African"],
    featured: true,
    imageUrl: "/heroImg.jpg"
  },
  {
    id: "2",
    name: "Iya Maria's Spot",
    city: "Abuja",
    country: "Nigeria",
    cuisines: ["Traditional", "Seafood"],
    featured: false,
    imageUrl: "/heroImg.jpg"
  },
  {
    id: "3",
    name: "Iya Joy Foods",
    city: "Port Harcourt",
    country: "Nigeria",
    cuisines: ["Homestyle", "Grill"],
    featured: true,
     imageUrl: "/heroImg.jpg"
  },
  {
    id: "4",
    name: "Mama's Delight",
    city: "Ibadan",
    country: "Nigeria",
    cuisines: ["Fusion", "Continental"],
    featured: false,
    imageUrl: "/heroImg.jpg"
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const filteredRestaurants = MOCK_RESTAURANTS.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisines.some((cuisine) =>
        cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      )
  )

  const handleRemoveFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter))
  }

  return (
    <div className="mx-auto my-10 max-padd-container">
      <div className="flex flex-col gap-10 md:flex-row">
        <aside className="w-full md:w-1/4">
          <div className="p-4 bg-gray-100 rounded-lg">
           <FilterPage />
          </div>
        </aside>
        <main className="flex-1">
          <div className="relative mb-6">
            <Input
              type="text"
              placeholder="Search by restaurant or cuisine"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button
              size="icon"
              className="absolute -translate-y-1/2 right-1 top-1/2"
            >
              <Search className="w-4 h-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>

          <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center">
            <h2 className="text-lg font-semibold">
              {filteredRestaurants.length} results found
            </h2>
            <div className="flex flex-wrap gap-2">
              {selectedFilters.map((filter) => (
                <Badge
                  key={filter}
                  variant="secondary"
                  className="px-2 py-1 text-sm"
                >
                  {filter}
                  <button
                    onClick={() => handleRemoveFilter(filter)}
                    className="ml-2 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                    <span className="sr-only">Remove {filter} filter</span>
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    className="object-cover w-full h-full"
                  />
                  {restaurant.featured && (
                    <div className="absolute px-2 py-1 text-sm font-medium bg-white rounded top-2 left-2 bg-opacity-90">
                      Featured
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="mb-2 text-xl font-bold">{restaurant.name}</h3>
                  <div className="flex items-center gap-1 mb-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">
                      City: <span className="font-medium">{restaurant.city}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-4 text-gray-600">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">
                      Country: <span className="font-medium">{restaurant.country}</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.cuisines.map((cuisine) => (
                      <Badge key={cuisine} variant="outline" className="px-2 py-1">
                        {cuisine}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 border-t">
                  <Link to={`/restaurant/${restaurant.id}`} className="ml-auto">
                    <Button className="bg-green hover:bg-hoverGreen">View Menu</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}