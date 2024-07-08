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
