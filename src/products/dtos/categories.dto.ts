import { IsNotEmpty, IsOptional, IsPositive, IsString, IsUrl, Min } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;
}

export class UpdateCategoryDto  extends PartialType(CreateCategoryDto){}

export class FilterCategoriesDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
