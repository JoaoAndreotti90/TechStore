import { Controller, Get, Post, Req, Res, UseGuards, Patch, Body, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, UpdateProfileDto, SaveOrderDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = await this.authService.validateUser(req.user);
    const data = await this.authService.login(user);
    return res.redirect(`http://localhost:3002/login/success?token=${data.access_token}`);
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.registerLocal(body);
  }

  @Post('login')
  async loginLocal(@Body() body: LoginDto) {
    return this.authService.loginLocal(body);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req) {
    return this.authService.getProfile(req.user.email);
  }

  @Patch('profile')
  @UseGuards(AuthGuard('jwt'))
  async updateProfile(@Req() req, @Body() body: UpdateProfileDto) {
    return this.authService.updateProfile(req.user.email, body);
  }

  @Delete('me')
  @UseGuards(AuthGuard('jwt'))
  async deleteAccount(@Req() req) {
    return this.authService.deleteAccount(req.user.email);
  }

  @Post('orders')
  @UseGuards(AuthGuard('jwt'))
  async saveOrder(@Req() req, @Body() body: SaveOrderDto) {
    return this.authService.saveOrder(req.user.email, body.cart, body.total);
  }

  @Get('orders')
  @UseGuards(AuthGuard('jwt'))
  async getOrders(@Req() req) {
    return this.authService.getOrders(req.user.email);
  }
  @Post('cart')
  @UseGuards(AuthGuard('jwt'))
  async syncCart(@Req() req, @Body() body: { cart: any[] }) {
    return this.authService.syncCart(req.user.email, body.cart);
  }

  @Get('cart')
  @UseGuards(AuthGuard('jwt'))
  async getCart(@Req() req) {
    return this.authService.getCart(req.user.email);
  }
}