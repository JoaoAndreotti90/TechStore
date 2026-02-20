import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateSessionDto } from './checkout.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('create-session')
  async createSession(@Body() body: CreateSessionDto) {
    return this.checkoutService.createSession(body);
  }

  @Get('verify')
  async verifySession(@Query('session_id') sessionId: string) {
    return this.checkoutService.verifySession(sessionId);
  }
}