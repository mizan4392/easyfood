import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

import { useNavigate } from "react-router-dom";
type Props = {
  children: React.ReactNode;
};

export default function Auth0ProviderWithNavigate({ children }: Props) {

 
  const navigate = useNavigate()
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URI;

  if (!domain || !clientId || !redirectUri) {
    throw new Error(
      "Auth0ProviderWithNavigate: Missing environment variables. Make sure to define VITE_AUTH0_DOMAIN, VITE_AUTH0_CLIENT_ID, and VITE_AUTH0_CALLBACK_URI in your .env file"
    );
  }

  const onRedirectCallback = () => {
    navigate('auth-callback')
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
