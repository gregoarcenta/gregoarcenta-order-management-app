import { Status } from '../enums/status';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsString()
  @Length(3, 150)
  @Transform(({ value }) => value.toLocaleLowerCase().trim())
  @ApiProperty({
    description: 'CreateOrderDto customer name',
    example: 'test name',
  })
  customer_name: string;

  @IsString()
  @Length(3, 150)
  @Transform(({ value }) => value.toLocaleLowerCase().trim())
  @ApiProperty({ description: 'CreateOrderDto item', example: 'Axe' })
  item: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({ description: 'CreateOrderDto customer name', example: 1 })
  quantity: number;

  @IsEnum(Status)
  @IsOptional()
  @ApiProperty({
    description: 'CreateOrderDto customer name',
    example: Status.PENDING,
    required: false,
  })
  status?: Status;
}
