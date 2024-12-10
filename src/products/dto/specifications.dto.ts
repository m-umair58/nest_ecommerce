import { IsString } from 'class-validator';

export class SpecificationsDto {
  @IsString()
  weight: string;

  @IsString()
  battery_life: string;

  @IsString()
  bluetooth: string;

  @IsString()
  noise_cancellation: string;
}
