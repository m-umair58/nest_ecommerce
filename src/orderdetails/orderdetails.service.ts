import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getOrderByIdDTO, orderDetailsDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class OrderdetailsService {
    constructor(private prisma:PrismaService){}

    async createOrderDetails(dto:orderDetailsDto){
        try{
            const order = await this.prisma.order.create({
                data:{
                    userId:dto.userId,
                    productId:dto.productId,
                    productQuantity:dto.productQuantity,
                    status:dto.status
                }
            })
            // console.log("==============",order);
            return order;
        }catch(e){
            if (e instanceof PrismaClientKnownRequestError) {
                console.log('Forbidden exception caught:', e.message);
                throw new ForbiddenException('there is an error');
              }
        }
    }

    async getOrders(id:number){
        try{
            const orders = await this.prisma.order.findMany({
                where:{
                    userId:id
                }
            })
            // console.log(orders);
            return orders;
        }
        catch(e){
            console.log(e);
            if (e instanceof PrismaClientKnownRequestError) {
                console.log('Forbidden exception caught:', e.message);
                throw new ForbiddenException('there is an error');
              }
        }
    }
}
