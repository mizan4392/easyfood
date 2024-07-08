import { useQuery } from "react-query";
import { API_BASE_URL } from "./http";
import { RestaurantSearchResponse } from "@/types";

export const useSearchRestaurants = (city?: string) => {
  const searchRestaurants = async (): Promise<RestaurantSearchResponse> => {
    const response = await fetch(`${API_BASE_URL}/restaurant/search/${city}`);
    if (!response.ok) {
      throw new Error("Failed to fetch restaurants");
    }
    return response.json();
  };

  const { data, isLoading } = useQuery(
    ["searchRestaurants"],
    searchRestaurants,
    {
      enabled: !!city,
    }
  );

  return {
    restaurants: data,
    isLoading,
  };
};
