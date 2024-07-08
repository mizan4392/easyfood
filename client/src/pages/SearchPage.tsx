import { useSearchRestaurants } from "@/apis/RestaurantApi";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchRestaurantInfo from "@/components/SearchRestaurantInfo";
import SearchResultCard from "@/components/SearchResultCard";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
};
export default function SearchPage() {
  const { city } = useParams<{ city: string }>();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
  });

  const { restaurants, isLoading } = useSearchRestaurants(searchState, city);

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
    }));
  };
  const onSearchReset = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
    }));
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!restaurants?.data || !city) {
    return <div>No Restaurant found.</div>;
  }
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">insert cuisines here:</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeholder="Search by cuisine or restaurant name"
          onReset={onSearchReset}
        />
        <SearchRestaurantInfo
          total={restaurants.pagination.total}
          city={city}
        />
        {restaurants.data.map((restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}
