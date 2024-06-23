import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({ timestamps: true })
export class Customer extends Document {
  //id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true})
  lastname: string;

  @Prop()
  phone: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
