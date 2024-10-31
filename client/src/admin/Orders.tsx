import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, MapPin, Clock, Currency } from "lucide-react"
import { useRestaurantStore } from "@/store/useRestaurantStore"
import { useEffect } from "react"

// Updated CartItem interface to match CheckoutSessionRequest
interface CartItem {
  menuId: string;
  name: string;
  image: string;
  price: string;
  quantity: string;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  preparing: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  outfordelivery: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
} as const;

type OrderStatus = keyof typeof statusColors;

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString();
};

const Orders = () => {
  const { restaurantOrder, getRestaurantOrders, updateRestaurantOrder } =
    useRestaurantStore();

  const handleStatusChange = async (id: string, status: string) => {
    await updateRestaurantOrder(id, status);
  };

  useEffect(() => {
    getRestaurantOrders();
  }, [getRestaurantOrders]);

  const getStatusColor = (status: string): string => {
    const normalizedStatus = status.toLowerCase().replace(/\s+/g, '') as OrderStatus;
    return statusColors[normalizedStatus] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  };

  // Updated getOrderItemsSummary to handle string quantities
  const getOrderItemsSummary = (items: CartItem[]): string => {
    const totalItems = items.reduce((sum, item) => sum + parseInt(item.quantity, 10), 0);
    return `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
  };

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <div className="px-4 py-8 mx-auto mt-16 max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Orders Dashboard
          </h1>
          <Badge variant="outline" className="px-3 py-1">
            <Clock className="w-4 h-4 mr-2" />
            Today's Orders
          </Badge>
        </div>

        <div className="grid gap-6">
        {restaurantOrder.map((order) => (
            <Card key={order._id} className="border dark:border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-bold dark:text-white">
                    {order.deliveryDetails.name}
                  </CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Package className="w-5 h-5 text-gray-500" />
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Order Items</Label>
                        <p className="text-base font-medium dark:text-white">
                          {getOrderItemsSummary(order.cartItems)}
                          <span className="block text-sm text-gray-500">
                            {order.cartItems.map(item => 
                              `${item.quantity}x ${item.name}`
                            ).join(', ')}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Delivery Address</Label>
                        <p className="text-base font-medium dark:text-white">
                          {order.deliveryDetails.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Currency className="w-5 h-5 text-gray-500" />
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Total Amount</Label>
                        <p className="text-base font-medium dark:text-white">
                          {order.totalAmount / 100}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Update Order Status
                    </Label>
                    <Select
                      onValueChange={(newStatus) =>
                        handleStatusChange(order._id, newStatus)
                      }
                      defaultValue={order.status}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {[
                            "Pending",
                            "Confirmed",
                            "Preparing",
                            "OutForDelivery",
                            "Delivered",
                          ].map((status: string) => (
                            <SelectItem key={status} value={status.toLowerCase()}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;