import landingImage from "@/assets/landing.png";
import appDownloadImage from "@/assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useGetRestaurants } from "@/apis/RestaurantApi";
import { RestaurantCard } from "@/components/RestaurantCard";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function HomePage() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetRestaurants("1");
  console.log(data);
  const handleSearchSubmit = (searchValues: SearchForm) => {
    navigate({
      pathname: `search/${searchValues.searchQuery}`,
    });
  };
  return (
    <div className=" flex flex-col gap-12">
      <div className=" md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className=" text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeaway today
        </h1>
        <span className=" text-xl">Food is just a click away </span>
        <SearchBar
          placeholder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-10">
          Popular Restaurants
        </h1>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data?.data?.map((restaurant) => (
                <RestaurantCard key={restaurant._id} restaurant={restaurant} />
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <button
                // onClick={handleLoadMore}
                className="px-7 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition duration-300 shadow-lg hover:scale-105"
              >
                Load More
              </button>
            </div>
          </div>
        )}
      </div>
      <div className=" grid md:grid-cols-2 gap-5">
        <img src={landingImage} alt="landingImage" />
        <div className=" flex flex-col items-center justify-center gap-4 text-center">
          <span className=" font-bold text-3xl tracking-tighter">
            Order takeaway even faster
          </span>
          <span>
            Download EasyFood app for faster ordering and personalized
            recommendations
          </span>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  );
}
