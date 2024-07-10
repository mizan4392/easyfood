import { useQuery } from "react-query";
import { API_BASE_URL } from "./http";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { SearchState } from "@/pages/SearchPage";

export const useGetRestaurantById = (restaurantId?: string) => {
  const getRestaurantById = async (): Promise<Restaurant> => {
    const response = await fetch(`${API_BASE_URL}/restaurant/${restaurantId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch restaurant");
    }
    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "getRestaurantById",
    getRestaurantById,
    {
      enabled: !!restaurantId,
    }
  );

  return { restaurant, isLoading };
};

export const useSearchRestaurants = (
  searchState?: SearchState,
  city?: string
) => {
  const searchRestaurants = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState?.searchQuery || "");
    params.set("page", searchState?.page.toString() || "1");
    params.set(
      "selectedCuisines",
      searchState?.selectedCuisines.join(",") || ""
    );
    params.set("sortOption", searchState?.sortOption || "bestMatch");
    const response = await fetch(
      `${API_BASE_URL}/restaurant/search/${city}?${params.toString()}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch restaurants");
    }
    return response.json();
  };

  const { data, isLoading } = useQuery(
    ["searchRestaurants", searchState],
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
