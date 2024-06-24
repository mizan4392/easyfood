import { postDataAndFileHeader } from "./http";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyRestaurantRequest = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createUserRequest = async (data: FormData): Promise<Restaurant> => {
    const url = `${API_BASE_URL}/my-restaurant`;
    const accessToken = await getAccessTokenSilently();
    const options = postDataAndFileHeader(data, accessToken);
    const response = await fetch(url, options);

    return response.json();
  };
  const {
    mutate: createRestaurant,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useMutation(createUserRequest);
  console.log(isLoading, isError, isSuccess, error);

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
