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
import { useCartStore } from "@/store/useCartStore"
import { CartItem } from "@/types/cartType";

export default function Cart() {
  const [open, setOpen] = useState<boolean>(false);
  const { cart, decrementQuantity, incrementQuantity,clearCart,removeFromTheCart } = useCartStore();

  const totalAmount = cart.reduce((acc, ele) => {
    return acc + ele.price * ele.quantity;
  }, 0);


  return (
    <div className="flex flex-col px-4 mx-auto my-10 max-padd-container">
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
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell> {item.price}</TableCell>
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
              <TableCell>	₦{item.price * item.quantity}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>  removeFromTheCart(item._id)}
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
            <TableCell className="font-medium text-right">	₦{totalAmount.toFixed(2)}</TableCell>
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