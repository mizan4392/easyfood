import { useGetRestaurantById } from "@/apis/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItemComponent from "@/components/MenuItemComponent";
import OrderSummery from "@/components/OrderSummery";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { MenuItem } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItemType = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function RestaurantDetailPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { restaurant, isLoading } = useGetRestaurantById(restaurantId);

  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prev) => {
      // Check if the item is already in the cart
      const exist = prev.find((item) => item._id === menuItem._id);

      let updatedCartItems = [];
      //if it is, update the quantity
      if (exist) {
        updatedCartItems = prev.map((item) =>
          item._id === menuItem._id
            ? { ...exist, quantity: exist.quantity + 1 }
            : item
        );
      } else {
        updatedCartItems = [...prev, { ...menuItem, quantity: 1 }];
      }
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };
  const removeItemFromCart = (cartItem: CartItemType) => {
    setCartItems((prev) => {
      const updatedCartItems = prev.filter((item) => item._id !== cartItem._id);
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };
  if (isLoading || !restaurant) {
    return <div>Loading...</div>;
  }
  return (
    <div className=" flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imgUrl}
          className=" rounded-md w-full h-full object-cover"
        />
      </AspectRatio>
      <div className=" grid md:grid-cols-[4fr_2fr] gap-5 md:px32">
        <div className=" flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className=" text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems?.map((menuItem) => (
            <MenuItemComponent
              key={menuItem._id}
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummery
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeItemFromCart}
            />
            <CardFooter>
              <CheckoutButton />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
