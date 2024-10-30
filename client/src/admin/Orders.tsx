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

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  preparing: "bg-purple-100 text-purple-800",
  outfordelivery: "bg-orange-100 text-orange-800",
  delivered: "bg-green-100 text-green-800"
}

const Orders = () => {
  const { restaurantOrder, getRestaurantOrders, updateRestaurantOrder } =
     useRestaurantStore();

   const handleStatusChange = async (id: string, status: string) => {
    await updateRestaurantOrder(id, status);
  };

  useEffect(() => {
    getRestaurantOrders(); 
  }, []);

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
          {/* Restaurant Orders display here  */}
          {restaurantOrder.map((order) => (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xl font-bold">
                  {/* {order.deliveryDetails.name} */}
                  Order #1234
                </CardTitle>
                <Badge className={statusColors['pending']}>
                  Pending
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Package className="w-5 h-5 text-gray-500" />
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Order Items</Label>
                        <p className="text-base font-medium">
                          {/* {order.items.length} items */}
                          3 items
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Delivery Address</Label>
                        <p className="text-base font-medium">
                          {order.deliveryDetails.address}
                          
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Currency className="w-5 h-5 text-gray-500" />
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Total Amount</Label>
                        <p className="text-base font-medium">
                          ${order.totalAmount / 100}
                        
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
                          ].map((status: string, index: number) => (
                            <SelectItem key={index} value={status.toLowerCase()}>
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
  )
}

export default Orders