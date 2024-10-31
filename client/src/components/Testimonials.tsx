import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    content: "This product has transformed how we handle our digital marketing campaigns. The analytics features are particularly impressive.",
    rating: 5,
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    content: "The developer tools and API documentation are top-notch. Integration was seamless and the support team was incredibly helpful.",
    rating: 5,
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 3,
    name: "Emily Roberts",
    role: "Small Business Owner",
    content: "As someone running a growing business, this platform has been a game-changer. The automation features save me hours each week.",
    rating: 4,
    avatar: "/api/placeholder/100/100"
  }
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    setCurrentIndex((current) => 
      current === 0 ? testimonials.length - 1 : current - 1
    )
  }, [])

  const scrollNext = useCallback(() => {
    setCurrentIndex((current) => 
      current === testimonials.length - 1 ? 0 : current + 1
    )
  }, [])

  useEffect(() => {
    const timer = setInterval(scrollNext, 5000)
    return () => clearInterval(timer)
  }, [scrollNext])

  const RenderStars = ({ count }: { count: number }) => (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  )

  return (
    <div className="relative max-w-3xl px-4 mx-auto">
      <Card className="overflow-hidden bg-white shadow-xl">
        <div className="relative h-full p-8">
          <div className="flex flex-col items-center space-y-6 text-center">
            <img
              src={testimonials[currentIndex].avatar}
              alt={testimonials[currentIndex].name}
              className="object-cover w-20 h-20 rounded-full"
            />
            <RenderStars count={testimonials[currentIndex].rating} />
            <blockquote className="text-lg italic text-gray-700">
              "{testimonials[currentIndex].content}"
            </blockquote>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">
                {testimonials[currentIndex].name}
              </h3>
              <p className="text-sm text-gray-500">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="absolute left-0 right-0 flex justify-between transform -translate-y-1/2 top-1/2">
        <Button
          onClick={scrollPrev}
          size="icon"
          variant="outline"
          className="bg-white rounded-full shadow-lg hover:bg-gray-100"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="sr-only">Previous testimonial</span>
        </Button>
        <Button
          onClick={scrollNext}
          size="icon"
          variant="outline"
          className="bg-white rounded-full shadow-lg hover:bg-gray-100"
        >
          <ChevronRight className="w-4 h-4" />
          <span className="sr-only">Next testimonial</span>
        </Button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;