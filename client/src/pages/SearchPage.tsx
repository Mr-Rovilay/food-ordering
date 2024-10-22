import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe, MapPin, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

const SearchPage = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <div className="my-10 max-padd-container">
      <div className="flex flex-col justify-between gap-10 md:flex-row">
        <FilterPage />
        <div className="flex-1">
          <div className="relative flex items-center gap-2">
            <Input
              type="text"
              placeholder="search by restaurant or places"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              className="absolute p-2 -translate-y-1/2 rounded-full right-1 top-1/2"
              size="icon"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
          {/* searched item display here */}
          <div className="">
            <div className="flex flex-col gap-3 my-3 md:flex-row md:items-center md:gap-2">
              <h1 className="text-sm font-medium">
                (3) searched results found
              </h1>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {["iya togo", "iya maria", "iya joy foods"].map(
                  (selectedFilter: string, idx: number) => (
                    <div className="relative inline-flex items-center max-w-full">
                      <Badge
                        className="text-[#D19254] rounded-md hover:cursor-pointer pr-6 whitespace-nowrap"
                        variant={"outline"}
                      >
                        {selectedFilter}
                      </Badge>
                      <X
                        size={16}
                        className="absolute text-[#D19254] right-1 hover:cursor-pointer"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
            {/* restaurant card */}
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {
                [1,2,3,4].map((Item:number, idx:number)=>(
              <Card key={idx} className="overflow-hidden transition-shadow duration-300 bg-white shadow-xl dark:bg-gray-800 rounded-xl hover:shadow-2xl">
                <div className="relative">
                  <AspectRatio ratio={16 / 6}>
                    <img
                      src="/heroImg.jpg"
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                  <div className="absolute px-2 py-1 bg-white bg-opacity-75 rounded-lg top-2 left-2 dark:bg-gray-700">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      featured
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    name of food
                  </h1>
                  <div className="flex items-center gap-1 mt-2 text-gray-600 dark:text-gray-400">
                    <MapPin size={16} />
                    <p className="text-sm">
                      city:{""}{" "}
                      <span className="font-medium capitalize">lagos</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1 mt-2 text-gray-600 dark:text-gray-400">
                    <Globe size={16} />
                    <p className="text-sm">
                      Country:{""}{" "}
                      <span className="font-medium capitalize">Nigeria</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["hello", "world", "rice"].map(
                      (cuisine: string, idx: number) => (
                        <Badge
                          key={idx}
                          className="px-2 py-1 font-medium rounded-full shadow-sm"
                        >
                          {cuisine}
                        </Badge>
                      )
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end p-4 text-white border-t dark:border-t-gray-700 border-t-gray-100">
                  <Link to={`/restaurant/${123}`}>
                    <Button className="px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-full shadow-md bg-green hover:bg-hoverGreen">
                      View Menus
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const SearchPageSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <Card
          key={index}
          className="overflow-hidden bg-white shadow-xl dark:bg-gray-800 rounded-xl"
        >
          <div className="relative">
            <AspectRatio ratio={16 / 6}>
              <Skeleton className="w-full h-full" />
            </AspectRatio>
          </div>
          <CardContent className="p-4">
            <Skeleton className="w-3/4 h-8 mb-2" />
            <div className="flex items-center gap-1 mt-2 text-gray-600 dark:text-gray-400">
              <Skeleton className="w-1/2 h-4" />
            </div>
            <div className="flex items-center gap-1 mt-2 text-gray-600 dark:text-gray-400">
              <Skeleton className="w-1/2 h-4" />
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-20 h-6" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end p-4 dark:bg-gray-900">
            <Skeleton className="w-24 h-10 rounded-full" />
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

const NoResultFound = ({ searchText }: { searchText: string }) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        No results found
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        We couldn't find any results for "{searchText}". <br /> Try searching
        with a different term.
      </p>
      <Link to="/">
        <Button className="mt-4 bg-green hover:bg-greenHover">
          Go Back to Home
        </Button>
      </Link>
    </div>
  );
};
