import { useState } from "react"
import { Minus, Plus, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import CheckoutConfirmPage from "@/pages/CheckoutConfirmPage"

interface CartItem {
  _id: string
  name: string
  price: number
  quantity: number
  image: string
}

const initialCart: CartItem[] = [
  { _id: "1", name: "Product 1", price: 10, quantity: 2, image: "/placeholder.svg?height=40&width=40" },
  { _id: "2", name: "Product 2", price: 15, quantity: 1, image: "/placeholder.svg?height=40&width=40" },
]

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>(initialCart)
  const [open, setOpen] = useState<boolean>(false)

  const incrementQuantity = (id: string) => {
    setCart(cart.map(item => 
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    ))
  }

  const decrementQuantity = (id: string) => {
    setCart(cart.map(item => 
      item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ))
  }

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item._id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="flex flex-col px-4 mx-auto my-10 max-w-7xl">
      <div className="flex justify-end mb-4">
        <Button variant="link" onClick={clearCart}>Clear All</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item: CartItem) => (
            <TableRow key={item._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={item.image} alt={item.name} />
                  <AvatarFallback>{item.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex items-center border border-gray-200 rounded-full shadow-sm w-fit dark:border-gray-700">
                  <Button
                    onClick={() => decrementQuantity(item._id)}
                    size="icon"
                    variant="ghost"
                    className="rounded-full"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    onClick={() => incrementQuantity(item._id)}
                    size="icon"
                    className="rounded-full"
                    variant="ghost"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeItem(item._id)}
                >
                  <X className="w-4 h-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="font-medium text-right">${totalAmount.toFixed(2)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end mt-6">
        <Button
          onClick={() => setOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Proceed To Checkout
        </Button>
      </div>
      {/* Placeholder for CheckoutConfirmPage */}
      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  )
}