import { useMutation } from "react-query";
import { postHeader } from "./http";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
  name?:string
};

export const useCreateMyUser = () => {
  const createUserRequest = async (data: CreateUserRequest) => {
    const url = `${API_BASE_URL}/user/create`;
    const options = postHeader(data);
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createUserRequest);

  return{
    createUser,
    isLoading,
    isError,
    isSuccess
  }
};
