import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { billingDetailsDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class BillingDetailsService {
  constructor(private prisma: PrismaService) {}

  async createBillingDetails(dto: billingDetailsDto) {
    try {
        const bill = this.prisma.billing.create({
            data:{
                name:dto.name,
                email:dto.email,
                address:dto.address,
                city:dto.city,
                postalCode:dto.postalCode,
                orderId:dto.orderId
            }
        })
        return bill;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        console.log('Forbidden exception caught:', e.message);
        throw new ForbiddenException('there is an error');
      }
    }
  }
}
