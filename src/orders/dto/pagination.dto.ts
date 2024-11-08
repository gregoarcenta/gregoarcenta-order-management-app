import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from '../enums/status';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ description: 'Page number', example: 1, required: false })
  page?: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ description: 'Items per page', example: 5, required: false })
  page_size?: number;

  @IsEnum(Status)
  @IsOptional()
  @ApiProperty({
    description: 'Order status',
    example: Status.PENDING,
    required: false,
  })
  status?: string;
}
