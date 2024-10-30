import { useState } from "react"
import { Minus, Plus, X, ShoppingCart } from "lucide-react"
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
import { useCartStore } from "@/store/useCartStore"
import { CartItem } from "@/types/cartType"
import { CheckoutConfirmPage } from "@/pages/CheckoutConfirmPage"
import { Link } from "react-router-dom"

const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center py-12 space-y-4">
    <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800">
      <ShoppingCart className="w-8 h-8 text-slate-500" />
    </div>
    <h3 className="text-xl font-semibold">Your cart is empty</h3>
    <p className="text-slate-500 dark:text-slate-400">
      Looks like you haven't added any items to your cart yet.
    </p>
    <Link to="/">
      <Button className="mt-4">
        Start Shopping
      </Button>
    </Link>
  </div>
)

export default function Cart() {
  const [open, setOpen] = useState<boolean>(false);
  const { cart, decrementQuantity, incrementQuantity, clearCart, removeFromTheCart } = useCartStore();

  const totalAmount = cart.reduce((acc, ele) => {
    return acc + ele.price * ele.quantity;
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="px-4 mx-auto my-10 max-padd-container">
        <EmptyCart />
      </div>
    )
  }

  return (
    <div className="flex flex-col px-4 mx-auto my-10 max-padd-container">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Shopping Cart ({cart.length})</h2>
        <Button variant="link" onClick={clearCart} className="text-red-500 hover:text-red-600">
          Clear All
        </Button>
      </div>
      
      <div className="border rounded-lg">
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
                    <AvatarFallback>
                      {item.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>₦{item.price.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center border border-gray-200 rounded-full shadow-sm w-fit dark:border-gray-700">
                    <Button
                      onClick={() => decrementQuantity(item._id)}
                      size="icon"
                      variant="ghost"
                      className="rounded-full"
                      disabled={item.quantity <= 1}
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
                <TableCell>₦{(item.price * item.quantity).toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeFromTheCart(item._id)}
                  >
                    <X className="w-4 h-4" />
                    <span className="sr-only">Remove {item.name} from cart</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total Amount</TableCell>
              <TableCell colSpan={2} className="text-lg font-medium text-right">
                ₦{totalAmount.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className="flex justify-end mt-6">
        <Button
          onClick={() => setOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          size="lg"
        >
          Proceed To Checkout
        </Button>
      </div>

      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  )
}