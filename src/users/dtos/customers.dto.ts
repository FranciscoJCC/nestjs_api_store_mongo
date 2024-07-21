import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsPhoneNumber, IsPositive, IsString, Min, ValidateNested } from "class-validator";
import { CreateSkillsDto } from "./skills.dto";

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true})
  @Type(() => CreateSkillsDto)
  readonly skills: CreateSkillsDto[];
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto){}

export class FilterCustomersDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}

export class Skills {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  color: string;
}

