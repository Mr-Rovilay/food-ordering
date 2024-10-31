import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director at TechCorp",
    content: "This product has transformed how we handle our digital marketing campaigns. The analytics features are particularly impressive, and we've seen a 40% increase in campaign effectiveness.",
    rating: 5,
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Senior Software Engineer",
    content: "The developer tools and API documentation are top-notch. Integration was seamless and the support team was incredibly helpful. We deployed our solution in half the expected time.",
    rating: 5,
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 3,
    name: "Emily Roberts",
    role: "E-commerce Business Owner",
    content: "As someone running a growing business, this platform has been a game-changer. The automation features save me hours each week, and the customer support is exceptional.",
    rating: 4,
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 4,
    name: "David Martinez",
    role: "Product Manager",
    content: "We've tried several similar solutions, but this one stands out for its intuitive interface and powerful features. Our team adopted it quickly and productivity soared.",
    rating: 5,
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Digital Strategy Consultant",
    content: "The ROI on this product has been phenomenal. My clients love the detailed reporting and the ability to make data-driven decisions quickly.",
    rating: 5,
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Startup Founder",
    content: "This platform scaled perfectly with our growing startup. From day one to our Series A, it has been an invaluable tool for our operations.",
    rating: 4,
    avatar: "/api/placeholder/100/100"
  }
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

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
    if (!isAutoPlaying) return
    const timer = setInterval(scrollNext, 5000)
    return () => clearInterval(timer)
  }, [scrollNext, isAutoPlaying])

  const RenderStars = ({ count }: { count: number }) => (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ))}
      {[...Array(5 - count)].map((_, i) => (
        <Star key={i + count} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  )

  return (
    <div className="relative max-w-4xl px-4 py-12 mx-auto">
      <Quote className="absolute w-16 h-16 text-gray-200 transform -top-6 -left-6 -rotate-12" />
      
      <Card className="overflow-hidden shadow-xl bg-gradient-to-br from-white to-gray-50">
        <div className="relative h-full p-8 md:p-12">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="relative">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name}
                className="object-cover w-24 h-24 rounded-full ring-4 ring-blue-50"
              />
              <div className="absolute -bottom-2 -right-2">
                <RenderStars count={testimonials[currentIndex].rating} />
              </div>
            </div>
            
            <blockquote className="max-w-2xl text-lg italic text-gray-700 md:text-xl">
              "{testimonials[currentIndex].content}"
            </blockquote>
            
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {testimonials[currentIndex].name}
              </h3>
              <p className="text-sm font-medium text-blue-600">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="absolute left-0 right-0 flex justify-between transform -translate-y-1/2 top-1/2">
        <Button
          onClick={() => {
            scrollPrev();
            setIsAutoPlaying(false);
          }}
          size="icon"
          variant="outline"
          className="rounded-full shadow-lg bg-white/90 backdrop-blur-sm hover:bg-green"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="sr-only">Previous testimonial</span>
        </Button>
        <Button
          onClick={() => {
            scrollNext();
            setIsAutoPlaying(false);
          }}
          size="icon"
          variant="outline"
          className="rounded-full shadow-lg bg-white/90 backdrop-blur-sm hover:bg-green"
        >
          <ChevronRight className="w-5 h-5" />
          <span className="sr-only">Next testimonial</span>
        </Button>
      </div>

      <div className="flex justify-center gap-3 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-green w-6' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;