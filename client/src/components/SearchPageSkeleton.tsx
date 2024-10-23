import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
export const SearchPageSkeleton = () => {
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