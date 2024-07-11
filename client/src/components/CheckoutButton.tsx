import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import UserProfileForm, { UserSchema } from "@/forms/UserProfileForm";
import { useGetMyUser } from "@/apis/users";

export type CheckoutButtonProps = {
  onCheckout: (userProfileData: UserSchema) => void;
  isDisabled: boolean;
};
export default function CheckoutButton({
  onCheckout,
  isDisabled,
}: CheckoutButtonProps) {
  const {
    isAuthenticated,
    isLoading: authLoading,
    loginWithRedirect,
  } = useAuth0();
  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();
  const { pathname } = useLocation();
  const onLogin = async () => {
    await loginWithRedirect({
      appState: { returnTo: pathname },
    });
  };
  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className=" bg-orange-500 flex-1">
        Login to checkout
      </Button>
    );
  }
  if (authLoading || !currentUser) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={isDisabled} className=" bg-orange-500 flex-1">
          Go to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          buttonText="Continue to payment"
          title="Confirm delivery details"
        />
      </DialogContent>
    </Dialog>
  );
}
