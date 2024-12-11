import { IsString } from 'class-validator';

export class SpecificationsDto {
  @IsString()
  key: string; // The specification key, e.g., "weight", "battery_life", etc.

  @IsString()
  value: string; // The value for the specification key, e.g., "2.3 lbs", "10 hours", etc.
}
