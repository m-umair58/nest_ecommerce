import { Body, Controller, Post } from '@nestjs/common';
import { BillingDetailsService } from './billing-details.service';
import { billingDetailsDto } from './dto';

@Controller('billing-details')
export class BillingDetailsController {
    constructor(private billingDetails:BillingDetailsService){}

    @Post('create')
    createBillingDetails(@Body() dto:billingDetailsDto){
        return this.billingDetails.createBillingDetails(dto);
    }
}
