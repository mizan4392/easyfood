import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useFormContext } from "react-hook-form";

export default function ImageSection() {
  const { control, watch } = useFormContext();
  const imgUrl = watch("imgUrl");
  return (
    <div className=" space-y-2">
      <div>
        <h2 className=" text-2xl font-bold">Image</h2>
        <FormDescription>upload an image of your restaurant</FormDescription>
      </div>
      <div className=" flex flex-col gap-8 md:w-[50%]">
        {imgUrl && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={imgUrl}
              alt="restaurant"
              className=" rounded-md object-cover w-full h-full"
            />
          </AspectRatio>
        )}
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className=" bg-white"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
