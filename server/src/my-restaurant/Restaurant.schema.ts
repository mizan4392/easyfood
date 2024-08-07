import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, InferSchemaType } from 'mongoose';
import { User } from 'src/user/User.schema';

@Schema()
export class MenuItem {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;
}
export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
export type MenuItemType = InferSchemaType<typeof MenuItemSchema>;
@Schema()
export class Restaurant extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  city: string;

  @Prop({ type: String, required: false })
  country: string;

  @Prop({ type: Number, required: true })
  deliveryPrice: number;

  @Prop({ type: Number, required: true })
  estimatedDeliveryTime: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: [String], required: true })
  cuisines: string[];

  @Prop({ type: [MenuItemSchema], default: [], required: true })
  menuItems: MenuItem[];

  @Prop({ type: String, required: true })
  imgUrl: string;

  @Prop({ type: Date, required: true })
  lastUpdated: string;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
