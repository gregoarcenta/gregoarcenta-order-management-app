import { Status } from '../enums/status';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString, Length,
  MaxLength,
  MinLength
} from "class-validator";
import { Transform, Type } from 'class-transformer';

export class CreateOrderDto {
  @IsString()
  @Length(3, 150)
  @Transform(({ value }) => value.toLocaleLowerCase().trim())
  customer_name: string;

  @IsString()
  @Length(3, 150)
  @Transform(({ value }) => value.toLocaleLowerCase().trim())
  item: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  quantity: number;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}
