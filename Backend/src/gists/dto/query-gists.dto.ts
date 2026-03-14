import 'reflect-metadata';
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class QueryGistsDto {
  @IsNumber()
  @Min(-90)
  @Max(90)
  @Type(() => Number)
  lat: number = 0;

  @IsNumber()
  @Min(-180)
  @Max(180)
  @Type(() => Number)
  lon: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5000)
  @Type(() => Number)
  radius?: number = 500;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  cursor?: string;
}
