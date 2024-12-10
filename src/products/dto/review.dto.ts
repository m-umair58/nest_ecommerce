import { IsString, IsInt } from 'class-validator';

export class ReviewDto {
  @IsString()
  user: string;

  @IsInt()
  rating: number;

  @IsString()
  comment: string;
}
