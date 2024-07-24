import {
  useCreateMyRestaurantRequest,
  useGetMyRestaurantOrdersRequest,
  useGetMyRestaurantRequest,
  useUpdateMyRestaurantRequest,
} from "@/apis/myResturant";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

export default function ManageRestaurantPage() {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurantRequest();
  const { myRestaurant } = useGetMyRestaurantRequest();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurantRequest();

  const { myRestaurantOrders, isLoading: isOrderRequestLoading } =
    useGetMyRestaurantOrdersRequest();

  const isEditing = !!myRestaurant;

  return (
    <Tabs defaultValue={"orders"}>
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className=" space-y-5 bg-gray-50 pg-10 rounded-lg"
      >
        <h2 className=" text-2xl font-bold">
          {myRestaurantOrders?.length} active orders
        </h2>
        {myRestaurantOrders?.map((order) => (
          <OrderItemCard
            key={order._id}
            order={order}
            isLoading={isOrderRequestLoading}
          />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={myRestaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
}
