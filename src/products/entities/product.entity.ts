import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import { Brand } from "./brand.entity";

@Schema({ timestamps: true})
export class Product extends Document {
  //id: number;
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Number, index: true })
  price: number;

  @Prop({ type: Number })
  stock: number;

  @Prop()
  image?: string

  //Relacion embebida
  @Prop(raw({
    name: { type: String },
    image: { type: String }
  }))
  category: Record<string, any>

  //Relacion 1-1 referenciada
  @Prop({ type: Types.ObjectId, ref: Brand.name })
  brand: Brand | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
//ProductSchema.index({ price: 1, stock: -1}) //1 - Ascendente, -1 Descendente
