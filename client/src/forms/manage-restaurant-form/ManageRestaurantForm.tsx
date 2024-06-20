import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const RestaurantFormSchema = z.object({
  name: z.string({
    required_error: "Restaurant name is required",
  }),

  city: z.string({
    required_error: "City is required",
  }),
  country: z.string({
    required_error: "Country name is required",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "Delivery price is required",
    invalid_type_error: "Delivery price must be a number",
  }),

  estimatedDeliveryTime: z.coerce.number({
    required_error: "Estimated delivery time is required",
    invalid_type_error: "Estimated delivery time must be a number",
  }),
  cuisines: z.array(z.string({})).nonempty({
    message: "At least one cuisine is required",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      price: z.coerce.number().min(1, "Price is required"),
    })
  ),
  imageFile: z.instanceof(File, { message: "Image is required" }),
});

type RestaurantFormData = z.infer<typeof RestaurantFormSchema>;

export default function ManageRestaurantForm({}: Props) {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(RestaurantFormSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [
        {
          name: "",
          price: 0,
        },
      ],
    },
  });

  const onSubmit = (formDataJson: RestaurantFormData) => {
    //TODO: Convert formDataJson to FormDataObject
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" space-y-8 p-10 bg-gray-50 rounded-lg "
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
      </form>
    </Form>
  );
}
