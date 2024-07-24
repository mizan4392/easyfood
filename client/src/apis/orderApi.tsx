import { useAuth0 } from "@auth0/auth0-react";
import { API_BASE_URL, postHeader } from "./http";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { CheckoutSessionRequest, Order } from "@/types";

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createCheckoutSessionRequest = async (
    data?: CheckoutSessionRequest
  ): Promise<{ url: string }> => {
    const token = await getAccessTokenSilently();
    const headers = postHeader(data, token);
    const response = await fetch(
      `${API_BASE_URL}/order/checkout/create-checkout-session`,
      headers
    );
    if (!response.ok) {
      throw new Error("Failed to create checkout session");
    }
    return response.json();
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest);
  console.log(error);
  if (error) {
    toast.error(error.toString());
    reset();
  }
  return { createCheckoutSession, isLoading };
};

export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyOrdersRequest = async (): Promise<Order[]> => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/order/my-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to get orders");
    }
    return response.json();
  };

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery("myOrders", getMyOrdersRequest, {
    refetchInterval: 5000,
  });
  if (error) {
    toast.error(error.toString());
  }
  return { orders, isLoading };
};
