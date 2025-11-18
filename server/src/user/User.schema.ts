import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({
    type: String,
    unique: true,
  })
  auth0Id: string;
  @Prop({
    type: String,
  })
  name: string;
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
  })
  addressLine1: string;
  @Prop({
    type: String,
  })
  city: string;
  @Prop({
    type: String,
  })
  country: string;

  @Prop({
    type: String,
  })
  imageUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
