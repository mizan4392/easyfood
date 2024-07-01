import {
  useCreateMyRestaurantRequest,
  useGetMyRestaurantRequest,
} from "@/apis/myResturant";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

export default function ManageRestaurantPage() {
  const { createRestaurant, isLoading } = useCreateMyRestaurantRequest();
  const { myRestaurant } = useGetMyRestaurantRequest();
  console.log(myRestaurant);
  return (
    <ManageRestaurantForm
      restaurant={myRestaurant}
      onSave={createRestaurant}
      isLoading={isLoading}
    />
  );
}
