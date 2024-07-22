export type User = {
  _id: string;
  name: string;
  email: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  name: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imgUrl: string;
  lastUpdated: string;
};
export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    page: number;
    pages: number;
    total: number;
  };
};

export type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: number;
  }[];
  deliveryDetails: {
    email?: string;
    name: string;
    addressLine1: string;
    city: string;
    country?: string;
  };
  restaurantId?: string;
};
export type OrderStatusType =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";
export type Order = {
  _id: string;
  restaurant: Restaurant;
  user: User;
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: number;
  }[];
  totalAmount: number;
  status: OrderStatusType;
  createdAt: string;
  restaurantId: string;
};
