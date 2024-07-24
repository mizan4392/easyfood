import { postDataAndFileHeader } from "./http";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyRestaurantRequest = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createUserRequest = async (data: FormData): Promise<Restaurant> => {
    const url = `${API_BASE_URL}/my-restaurant`;
    const accessToken = await getAccessTokenSilently();
    const options = postDataAndFileHeader(data, accessToken, "POST");
    const response = await fetch(url, options);

    return response.json();
  };
  const {
    mutate: createRestaurant,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createUserRequest);

  if (isSuccess) {
    toast.success("Restaurant created successfully");
  }
  if (isError) {
    toast.error("Failed to create restaurant");
  }
  return {
    createRestaurant,
    isLoading,
  };
};

export const useGetMyRestaurantRequest = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const url = `${API_BASE_URL}/my-restaurant`;
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch restaurant");
    }
    return response.json();
  };
  const { data, isLoading, isError } = useQuery(
    "my-restaurant",
    getMyRestaurantRequest
  );

  return {
    myRestaurant: data,
    isLoading,
    isError,
  };
};

export const useUpdateMyRestaurantRequest = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateUserRequest = async (data: FormData): Promise<Restaurant> => {
    const url = `${API_BASE_URL}/my-restaurant`;
    const accessToken = await getAccessTokenSilently();
    const options = postDataAndFileHeader(data, accessToken, "PATCH");
    const response = await fetch(url, options);

    return response.json();
  };
  const {
    mutate: updateRestaurant,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(updateUserRequest);

  if (isSuccess) {
    toast.success("Restaurant updated successfully");
  }
  if (isError) {
    toast.error("Failed to update restaurant");
  }
  return {
    updateRestaurant,
    isLoading,
  };
};

export const useGetMyRestaurantOrdersRequest = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const url = `${API_BASE_URL}/my-restaurant/orders`;
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    return response.json();
  };
  const { data, isLoading, isError } = useQuery(
    "my-restaurant-orders",
    getMyRestaurantOrdersRequest
  );

  return {
    myRestaurantOrders: data,
    isLoading,
    isError,
  };
};
