import { Module } from '@nestjs/common';
import { BillingDetailsService } from './billing-details.service';
import { BillingDetailsController } from './billing-details.controller';

@Module({
  providers: [BillingDetailsService],
  controllers: [BillingDetailsController]
})
export class BillingDetailsModule {}
