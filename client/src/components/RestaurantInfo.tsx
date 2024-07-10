import { Restaurant } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

export default function RestaurantInfo({ restaurant }: Props) {
  return (
    <Card className=" border-sla">
      <CardHeader>
        <CardTitle>{restaurant.name}</CardTitle>
        <CardDescription>
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className=" flex">
        {restaurant.cuisines.map((cuisine, i) => (
          <span key={cuisine} className="flex">
            <span>{cuisine}</span>
            {i < restaurant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
}
