import { Module } from '@nestjs/common';
import { OrderdetailsService } from './orderdetails.service';
import { OrderdetailsController } from './orderdetails.controller';

@Module({
  providers: [OrderdetailsService],
  controllers: [OrderdetailsController]
})
export class OrderdetailsModule {}
