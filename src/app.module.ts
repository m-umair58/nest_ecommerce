import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { PaymentModule } from './payment/payment.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BillingDetailsModule } from './billing-details/billing-details.module';
import { OrderdetailsModule } from './orderdetails/orderdetails.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ProductsModule,
    PrismaModule,
    PaymentModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true, // This makes ConfigModule available globally
    }),
    AuthModule,
    BillingDetailsModule,
    OrderdetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
