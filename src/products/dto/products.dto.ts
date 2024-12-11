import { IsString, IsInt, IsOptional, IsArray } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { SpecificationsDto } from './specifications.dto';
import { ReviewDto } from './review.dto';  // Assuming a separate DTO for reviews

export class productsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsInt()
  price: number;

  @IsString()
  manufacturer:string
  
  @IsString()
  availability:string

  @IsOptional()
  specifications?: SpecificationsDto[];

  @IsArray()
  @IsOptional()
  reviews?: ReviewDto[];
}