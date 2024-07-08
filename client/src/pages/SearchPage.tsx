import { useSearchRestaurants } from "@/apis/RestaurantApi";
import { useParams } from "react-router-dom";

export default function SearchPage() {
  const { city } = useParams<{ city: string }>();
  const { restaurants, isLoading } = useSearchRestaurants(city);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!restaurants?.data || !city) {
    return <div>No Restaurant found.</div>;
  }
  return (
    <div>
      Search for City {city}
      <span>
        {restaurants?.data?.map((restaurant) => {
          return <span key={restaurant._id}>found-{restaurant.name}</span>;
        })}
      </span>
    </div>
  );
}
