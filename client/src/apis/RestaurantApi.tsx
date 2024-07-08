import { useQuery } from "react-query";
import { API_BASE_URL } from "./http";
import { RestaurantSearchResponse } from "@/types";
import { SearchState } from "@/pages/SearchPage";

export const useSearchRestaurants = (
  searchState?: SearchState,
  city?: string
) => {
  const searchRestaurants = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState?.searchQuery || "");
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
