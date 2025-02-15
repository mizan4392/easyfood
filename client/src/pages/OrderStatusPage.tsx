import { useGetMyOrders } from "@/apis/orderApi";
import OrderStatusDetails from "@/components/OrderStatusDetails";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function OrderStatusPage() {
  const { isLoading, orders } = useGetMyOrders();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!orders || orders.length === 0) {
    return <div>No orders found</div>;
  }
  console.log(orders);
  return (
    <div className=" space-y-10">
      {orders.map((order) => (
        <div className=" space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap:10 md:grid-cols-2">
            <OrderStatusDetails order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imgUrl}
                alt={order.restaurant.name}
                className=" object-cover rounded-md h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
}
