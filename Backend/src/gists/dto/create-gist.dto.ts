import 'reflect-metadata';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateGistDto {
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number = 0;

  @IsNumber()
  @Min(-180)
  @Max(180)
  lon: number = 0;

  @IsString()
  text: string = '';

  @IsOptional()
  @IsString()
  authorAddress?: string;
}
