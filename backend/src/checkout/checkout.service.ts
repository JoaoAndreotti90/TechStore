import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';
import { CreateSessionDto } from './checkout.dto';

@Injectable()
export class CheckoutService {
  private stripe: Stripe;

  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-10-16' as any,
    });
  }

  async createSession(body: CreateSessionDto) {
    const user = await this.prisma.user.findUnique({ where: { email: body.email } });
    if (!user) throw new BadRequestException('Usuário não encontrado');

    const total = body.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order = await this.prisma.order.create({
      data: {
        userId: user.id,
        total: total,
        status: 'PENDENTE',
        items: {
          create: body.items.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          }))
        }
      }
    });

    const lineItems = body.items.map((item) => ({
      price_data: {
        currency: 'brl',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: body.email,
      client_reference_id: order.id.toString(),
      success_url: 'http://localhost:3002/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3002/',
    });

    return { url: session.url };
  }

  async verifySession(sessionId: string) {
    if (!sessionId) throw new BadRequestException('ID da sessão não fornecido');

    const session = await this.stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const orderId = Number(session.client_reference_id);
      
      await this.prisma.order.update({
        where: { id: orderId },
        data: { status: 'PAGO' },
      });

      return { success: true, message: 'Pedido pago com sucesso!' };
    }

    return { success: false, message: 'Pagamento não concluído.' };
  }
}