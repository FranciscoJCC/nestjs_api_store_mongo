import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Skills {
  @Prop()
  name: string

  @Prop()
  color: string
}

export const SkillsSchema = SchemaFactory.createForClass(Skills);
