import { MenuItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
type Props = {
  menuItem: MenuItem;
};

export default function MenuItemComponent({ menuItem }: Props) {
  return (
    <Card className=" cursor-pointer">
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className=" font-bold">
        ${menuItem.price.toFixed(2)}
      </CardContent>
    </Card>
  );
}
