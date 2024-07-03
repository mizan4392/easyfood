import {
  useCreateMyRestaurantRequest,
  useGetMyRestaurantRequest,
  useUpdateMyRestaurantRequest,
} from "@/apis/myResturant";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

export default function ManageRestaurantPage() {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurantRequest();
  const { myRestaurant } = useGetMyRestaurantRequest();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurantRequest();

  const isEditing = !!myRestaurant;

  console.log(myRestaurant);
  return (
    <ManageRestaurantForm
      restaurant={myRestaurant}
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
    />
  );
}
