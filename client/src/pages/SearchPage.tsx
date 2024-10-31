import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Globe, MapPin, Search, X } from "lucide-react"
import FilterPage from "./FilterPage"
import { useRestaurantStore } from "@/store/useRestaurantStore"
import NoResultFound from "@/components/NoResultFound"
import { SearchPageSkeleton } from "@/components/SearchPageSkeleton"
import { Restaurant } from "@/types/restaurantType"

export default function SearchPage() {
  const params = useParams<{ text: string }>()
  const [searchQuery, setSearchQuery] = useState<string>("")
  const {
    loading,
    searchedRestaurant,
    searchRestaurant,
   
    appliedFilter,
  } = useRestaurantStore()

  useEffect(() => {
    if (params.text) {
      searchRestaurant(params.text, searchQuery, appliedFilter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.text, appliedFilter])

  const handleSearch = () => {
    if (params.text) {
      searchRestaurant(params.text, searchQuery, appliedFilter)
    }
  }



  return (
    <div className="px-4 mx-auto my-10 max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10 mt-20 md:flex-row">
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
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pr-10"
            />
            <Button
              onClick={handleSearch}
              size="icon"
              className="absolute -translate-y-1/2 right-1 top-1/2"
            >
              <Search className="w-4 h-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>

          <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center">
            <h2 className="text-lg font-semibold">
              ({searchedRestaurant?.data.length || 0}) Search result found
            </h2>
            <div className="flex flex-wrap gap-2">
              {appliedFilter.map((filter: string, idx: number) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="px-2 py-1 text-sm"
                >
                  {filter}
                  <button
                   
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
            {loading ? (
              <SearchPageSkeleton />
            ) : !searchedRestaurant?.data.length ? (
              <NoResultFound searchText={params.text || ""} />
            ) : (
              searchedRestaurant.data.map((restaurant: Restaurant) => (
                <Card key={restaurant._id} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <img
                      src={restaurant.imageUrl}
                      alt={restaurant.restaurantName}
                      className="object-cover w-full h-full"
                    />
                    {restaurant.featured && (
                      <div className="absolute px-2 py-1 text-sm font-medium bg-white rounded top-2 left-2 bg-opacity-90">
                        Featured
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="mb-2 text-xl font-bold">
                      {restaurant.restaurantName}
                    </h3>
                    <div className="flex items-center gap-1 mb-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">
                        City: <span className="font-medium">{restaurant.city}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-4 text-gray-600">
                      <Globe className="w-4 h-4" />
                      <span className="text-sm">
                        Country:{" "}
                        <span className="font-medium">{restaurant.country}</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.cuisines.map((cuisine) => (
                        <Badge
                          key={cuisine}
                          variant="outline"
                          className="px-2 py-1"
                        >
                          {cuisine}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 border-t">
                    <Link
                      to={`/restaurant/${restaurant._id}`}
                      className="ml-auto"
                    >
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        View Menu
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  )
}