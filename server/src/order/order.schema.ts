import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { InferSchemaType } from 'mongoose';

// Define the DeliveryDetails schema
const DeliveryDetailsSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  addressLine1: { type: String, required: true },
  city: { type: String, required: true },
});

const CartItemSchema = new mongoose.Schema({
  menuItemId: { type: String, required: true },
  quantity: { type: String, required: true },
  name: { type: String, required: true },
});

export type DeliveryDetailsType = InferSchemaType<typeof DeliveryDetailsSchema>;
export type CartItemType = InferSchemaType<typeof CartItemSchema>;

@Schema()
export class Order {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  })
  _id: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  })
  restaurant: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;

  @Prop({ type: DeliveryDetailsSchema, required: true })
  deliveryDetails: DeliveryDetailsType;

  @Prop({ type: [CartItemSchema], default: [], required: true })
  cartItem: CartItemType[];

  @Prop({ type: Number, required: false })
  totalAmount?: number;

  @Prop({
    type: String,
    enum: ['place', 'paid', 'inProgress', 'outForDelivery', 'delivered'],
  })
  status: string;

  @Prop({ type: Date, required: true, default: Date.now })
  createdAt: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
