import { CartItemType } from "@/pages/RestaurantDetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItemType[];
  removeFromCart: (cartItem: CartItemType) => void;
};

export default function OrderSummery({
  restaurant,
  cartItems,
  removeFromCart,
}: Props) {
  const getTotalCoast = () => {
    const totalInPence = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalWithDelivery = totalInPence + restaurant.deliveryPrice;

    return (totalWithDelivery / 100).toFixed(2);
  };
  return (
    <>
      <CardHeader>
        <CardTitle className=" text-2xl font-bold tracking-tight flex justify-between">
          <span>Order Summery</span>
          <span>${getTotalCoast()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className=" flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className=" flex justify-between">
            <span>
              <Badge variant={"outline"} className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className=" flex items-center gap-1">
              ${((item.price * item.quantity) / 100).toFixed(2)}
              <Trash
                size={20}
                color="red"
                className=" cursor-pointer"
                onClick={() => removeFromCart(item)}
              />
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
}
