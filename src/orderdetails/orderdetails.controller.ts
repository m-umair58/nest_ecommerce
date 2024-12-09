import { Body, Controller, Post, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OrderdetailsService } from './orderdetails.service';
import { getOrderByIdDTO, orderDetailsDto } from './dto';

@Controller('orderdetails')
export class OrderdetailsController {
  constructor(private orderService: OrderdetailsService) {}

  @Post('create')
  createOrderDetails(@Body() dto: orderDetailsDto) {
    return this.orderService.createOrderDetails(dto);
  }

  @Get(':id')
  getOrderByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getOrders(id);
  }
}
