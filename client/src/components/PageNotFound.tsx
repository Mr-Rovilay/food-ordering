import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"

const PageNotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 bg-gray-50">
      <div className="max-w-md text-center">
        <img 
          src="/404.png" 
          alt="404 Not Found" 
          className="w-full max-w-sm mx-auto mb-8 rounded-lg shadow-lg"
        />
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Oops! Page not found</h1>
        <p className="mb-8 text-xl text-gray-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="inline-flex items-center px-6 py-3">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
      <p className="mt-12 text-sm text-gray-500">
        Book various meals around your location any day any time
      </p>
    </div>
  )
}

export default PageNotFound