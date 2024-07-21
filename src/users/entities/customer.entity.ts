import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Skills, SkillsSchema } from "./skills.entity";


@Schema({ timestamps: true })
export class Customer extends Document {
  //id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true})
  lastname: string;

  @Prop()
  phone: string;

  @Prop({ type: [SkillsSchema] })
  skills: Types.Array<Skills>
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
