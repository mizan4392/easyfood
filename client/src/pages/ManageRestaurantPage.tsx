import { useCreateMyRestaurantRequest } from "@/apis/myResturant";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

export default function ManageRestaurantPage() {
  const { createRestaurant, isLoading } = useCreateMyRestaurantRequest();
  return (
    <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading} />
  );
}
