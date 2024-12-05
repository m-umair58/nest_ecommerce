import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Controller('payment')
export class PaymentController {
  private stripe: Stripe;

  constructor(config:ConfigService) {
    this.stripe = new Stripe(config.get('SEC_KEY')); // Replace with your secret key
  }

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body: { amount: number }) {
    const { amount } = body;

    // Validate amount
    if (!amount || amount <= 0) {
      throw new BadRequestException('Invalid payment amount');
    }

    try {
      // Create payment intent
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount, // Amount in cents (smallest currency unit)
        currency: 'usd', // Adjust the currency as needed
      });

      return { clientSecret: paymentIntent.client_secret };
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error creating payment intent:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  }
}
