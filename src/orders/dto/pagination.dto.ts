import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from '../enums/status';

export class PaginationDto {
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page_size?: number;
  
  @IsEnum(Status)
  @IsOptional()
  status?: string;
}
