import {
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProductCharacteristicDto {
  @IsString()
  name: string;
  @IsString()
  value: string;
}

export class CreateProductDto {
  @IsString()
  image: string;
  @IsString()
  title: string;
  @IsNumber()
  price: number;
  @IsNumber()
  @IsOptional()
  oldPrice?: number;
  @IsNumber()
  credit: number;
  @IsString()
  description: string;
  @IsString()
  advantages: string;
  @IsString()
  disAdvantages: string;
  @IsString({ each: true })
  @IsArray()
  categories: string[];
  @IsString({ each: true })
  @IsArray()
  tags: string[];
  @IsArray()
  @ValidateNested()
  @Type(() => ProductCharacteristicDto)
  characteristics: ProductCharacteristicDto[];
}
