import { Product } from "src/products/entities/product.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Customer } from "./customer.entity";

@Schema({ timestamps: true })
export class Order extends Document{
  @Prop({ type: Date })
  date: Date;

  @Prop({ Type: Types.ObjectId, ref: Customer.name, required: true })
  customer: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId }],  ref: Product.name })
  products: Types.Array<Product>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
