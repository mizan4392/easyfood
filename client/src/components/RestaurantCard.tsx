import { Restaurant } from "@/types";
import { Link } from "react-router-dom";

export const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Link to={`/detail/${restaurant._id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
        {/* Image */}
        <div className="h-52 overflow-hidden">
          <img
            src={restaurant.imgUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-800">{restaurant.name}</h2>

          <p className="text-sm text-gray-500 mt-1">
            📍 {restaurant.city},{restaurant.country}
          </p>

          {/* Dishes */}
          <div className="mt-4 flex flex-wrap gap-2">
            {restaurant.cuisines.map((dish, index) => (
              <span
                key={index}
                className="bg-orange-100 text-orange-700 text-sm px-3 py-1 rounded-full"
              >
                {dish}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
