import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
  order: Order;
};

export default function OrderStatusHeader({ order }: Props) {
  const getExpectedDelivery = () => {
    const createdAt = new Date(order.createdAt);
    createdAt.setMinutes(
      createdAt.getMinutes() + order.restaurant.estimatedDeliveryTime
    );
    const hours = createdAt.getHours();
    const minutes = createdAt.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };
  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((status) => status.value === order.status) ||
      ORDER_STATUS[0]
    );
  };
  return (
    <>
      <h1 className=" text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span>Order Status: {getOrderStatusInfo().label}</span>
        <span>Expected by : {getExpectedDelivery()}</span>
      </h1>
      <Progress
        className=" animate-pulse"
        value={getOrderStatusInfo().progressValue}
      />
    </>
  );
}
