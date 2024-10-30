import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { SearchX } from "lucide-react"

interface NoResultFoundProps {
  searchText: string
}

export default function NoResultFound({ searchText }: NoResultFoundProps) {
  return (
    <Card className="max-w-md mx-auto mt-12">
      <CardContent className="pt-6 text-center">
        <SearchX className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          No results found
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          We couldn't find any results for "{searchText}".
        </p>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Try searching with a different term or browse our categories.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link to="/">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Return to Home
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}