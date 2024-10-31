import { ArrowLeft, CheckCircle2, Clock, Package } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOrderStore } from "@/store/useOrderStore";
import { useEffect } from "react";

// Updated CartItem interface to match your CheckoutSessionRequest
interface CartItem {
  menuId: string;
  name: string;
  image: string;
  price: string;
  quantity: string;
}

// Updated Order interface to match your Orders type
interface Order {
  _id: string;
  cartItems: CartItem[];
  status: string;
  totalAmount: number;
  deliveryDetails: {
    name: string;
    email: string;
    contact: string;
    address: string;
    city: string;
    country: string;
  };
  restaurantId: string;
}

const DELIVERY_FEE = 1000;

const STATUS_STYLES = {
  pending: {
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
  confirmed: {
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  preparing: {
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  outfordelivery: {
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  delivered: {
    color: "text-green-600",
    bg: "bg-green-100",
  },
} as const;

type OrderStatus = keyof typeof STATUS_STYLES;

const getStatusStyle = (status: string) => {
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, '') as OrderStatus;
  return STATUS_STYLES[normalizedStatus] || { color: "text-gray-600", bg: "bg-gray-100" };
};

const Success = () => {
  const { orders, getOrderDetails } = useOrderStore();

  useEffect(() => {
    getOrderDetails();
  }, [getOrderDetails]);

  // Updated to handle string price and quantity
  const calculateSubtotal = (cartItems: CartItem[]): number => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity, 10);
      return total + (price * quantity);
    }, 0);
  };

  const calculateTotal = (orders: Order[]): {subtotal: number, total: number} => {
    const subtotal = orders.reduce((total, order) => total + calculateSubtotal(order.cartItems), 0);
    return {
      subtotal,
      total: subtotal + DELIVERY_FEE
    };
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Package className="w-16 h-16 mb-4 text-gray-400" />
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          Order not found!
        </h1>
        <Link to="/cart" className="mt-4">
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Cart
          </Button>
        </Link>
      </div>
    );
  }

  const { subtotal, total } = calculateTotal(orders);
  const currentStatus = orders[0]?.status || "pending";
  const statusStyle = getStatusStyle(currentStatus);

  return (
    <div className="min-h-screen px-4 py-8 mt-16 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-green dark:text-gray-200">
              Order Confirmed!
            </CardTitle>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Thank you for your order. Your order has been successfully placed.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Estimated Delivery
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                    30-45 minutes
                  </p>
                </div>
              </div>
              <Badge 
                className={`${statusStyle.bg} ${statusStyle.color} border-0 dark:border dark:border-gray-600`}
              >
                {currentStatus.toUpperCase()}
              </Badge>
            </div>

            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                Order Summary
              </h2>

              {orders.map((order: Order, index: number) => (
              <div key={index}>
                {order.cartItems.map((item: CartItem, itemIndex: number) => (
                  <div key={itemIndex} className="p-4 transition-all rounded-lg group hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="object-cover w-20 h-20 rounded-lg"
                          />
                          <Badge className="absolute text-white bg-gray-900 -top-2 -right-2">
                            {item.quantity}
                          </Badge>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 dark:text-gray-200">
                            {item.name}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-800 dark:text-gray-200">
                        ₦
                        <span className="text-lg font-medium">
                          {(parseFloat(item.price) * parseInt(item.quantity, 10)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}

              <Separator className="my-6" />

              <div className="space-y-2">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <div className="flex items-center">
                    ₦<span>{subtotal.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Delivery Fee</span>
                  <div className="flex items-center">
                    ₦<span>{DELIVERY_FEE.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-gray-100">
                  <span>Total</span>
                  <div className="flex items-center">
                    ₦<span>{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Link to="/cart" className="w-full">
              <Button className="w-full" size="lg">
                Continue Shopping
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full">
              Track Order
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Success;