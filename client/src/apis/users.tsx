import { useMutation, useQuery } from "react-query";
import { getHeader, postHeader, updateHeader } from "./http";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { User } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
  name?:string
};

export const useCreateMyUser = () => {
  const {getAccessTokenSilently} = useAuth0()
  const createUserRequest = async (data: CreateUserRequest) => {
    const url = `${API_BASE_URL}/user/create`;
    const accessToken = await getAccessTokenSilently();
    const options = postHeader(data,accessToken);
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

type UpdateUserRequest = {
  name?: string;
  addressLine1?: string;
  city?: string;
  country?: string;
};

export const useUpdateMyUser = ()=>{
  const {getAccessTokenSilently} = useAuth0()

  const updateMyUserRequest = async (formData:UpdateUserRequest)=>{
    const url = `${API_BASE_URL}/user/update`;
    const accessToken = await getAccessTokenSilently();
    const options = updateHeader(formData,accessToken);
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  }

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset
  } = useMutation(updateMyUserRequest);

  if(isSuccess){
    toast.success("User profile updated!")
  }

  if(error){
    toast.error(error.toString())
    reset()
  }

  return{
    updateUser,
    isLoading,
    error,
    isSuccess,
    reset
  }
}

export const useGetMyUser = ()=>{
  const {getAccessTokenSilently} = useAuth0()

  const getMyUserRequest = async () :Promise<User>=>{
    const url = `${API_BASE_URL}/user/current-user`;
    const accessToken = await getAccessTokenSilently();

    const options = getHeader(accessToken);
    const response = await fetch(url, options);
    if(!response.ok){
      throw new Error('Failed to fetch user')
    }
    return response.json()
  }


  const {data:currentUser,isLoading,error} = useQuery('fetchCurrentUser',getMyUserRequest)
  if(error){
    toast.error(error.toString())
  }
  return {currentUser,isLoading}
}