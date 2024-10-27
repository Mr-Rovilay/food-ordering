import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Food Enthusiast",
    content: "FoodPalace has transformed my dining experience! The variety of cuisines and the ease of ordering make it my go-to app for all my meals.",
    image: "/api/placeholder/150/150"
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Restaurant Owner",
    content: "As a restaurant owner, partnering with FoodPalace has significantly increased our online presence and orders. Their platform is user-friendly and efficient.",
    image: "/api/placeholder/150/150"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Busy Professional",
    content: "FoodPalace saves me so much time! With their wide selection and quick delivery, I can enjoy gourmet meals even on my busiest days.",
    image: "/api/placeholder/150/150"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Food Blogger",
    content: "I've tried numerous food delivery apps, but FoodPalace stands out with its intuitive interface and reliable service. It's a game-changer for foodies!",
    image: "/api/placeholder/150/150"
  },
  {
    id: 5,
    name: "David Thompson",
    role: "Food Blogger",
    content: "I've tried numerous food delivery apps, but FoodPalace stands out with its intuitive interface and reliable service. It's a game-changer for foodies!",
    image: "/api/placeholder/150/150"
  }
]

const Testimonials: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay()])
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-padd-container">
      <h2 className="relative inline-block mb-12 text-xl font-bold text-center text-gray-800">
          What Our Customers Say
          <span className="absolute bottom-0 left-0 w-full h-1 transform -translate-y-2 bg-gradient-to-r from-green via-green to-green"></span>
        </h2>
        <div className="relative overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="flex-[0_0_100%] min-w-0 pl-4 sm:pl-6 md:flex-[0_0_50%] lg:flex-[0_0_33.33%]">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        className="w-12 h-12 mr-4 rounded-full"
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <Quote className="w-8 h-8 mb-4 text-primary/20" />
                    <p className="italic text-gray-700">{testimonial.content}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <Button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            size="icon"
            variant="outline"
            className="rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="sr-only">Previous testimonial</span>
          </Button>
          <Button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            size="icon"
            variant="outline"
            className="rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
            <span className="sr-only">Next testimonial</span>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials