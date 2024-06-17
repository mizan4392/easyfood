import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class MyRestaurantDto {
  @IsNotEmpty()
  name: string;
  @IsOptional()
  city: string;
  @IsOptional()
  country: string;
  @IsNotEmpty()
  deliveryPrice: number;
  @IsNotEmpty()
  estimatedDeliveryTime: string;
  @IsArray()
  @IsNotEmpty()
  cuisines: string[];
  @IsArray()
  @IsNotEmpty()
  menuItems: string;
}
