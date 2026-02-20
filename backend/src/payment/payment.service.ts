import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentItemDto } from './payment.dto';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2026-01-28.clover' as any,
    });
  }

  async createCheckoutSession(items: PaymentItemDto[], userId: number) {
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${frontendUrl}/login/success`,
      cancel_url: `${frontendUrl}/cart`,
      metadata: {
        userId: userId.toString(),
      },
    });

    return { url: session.url };
  }
}