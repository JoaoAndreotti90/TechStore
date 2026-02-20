import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(details: { email: string; name: string }) {
    const user = await this.prisma.user.findUnique({ where: { email: details.email } });
    if (user) return user;

    return this.prisma.user.create({
      data: {
        email: details.email,
        name: details.name,
        password: '',
        role: 'USER',
      },
    });
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role,
        phone: user.phone || '',
        address: user.address || ''
      }
    };
  }

  async registerLocal(data: { name: string; email: string; password?: string }) {
    if (!data.password) throw new BadRequestException('A senha é obrigatória.');

    const userExists = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (userExists) {
      throw new BadRequestException('Este e-mail já está cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        role: 'USER',
      },
    });

    return this.login(newUser);
  }

  async loginLocal(data: { email: string; password?: string }) {
    if (!data.password) throw new UnauthorizedException('A senha é obrigatória.');

    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      throw new UnauthorizedException('E-mail ou senha incorretos.');
    }

    if (!user.password) {
      throw new UnauthorizedException('Você se cadastrou pelo Google. Use o botão do Google para entrar.');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('E-mail ou senha incorretos.');
    }

    return this.login(user);
  }

  async updateProfile(email: string, data: { name: string; phone: string; address: string }) {
    return this.prisma.user.update({
      where: { email },
      data: { name: data.name, phone: data.phone, address: data.address },
    });
  }

  async getProfile(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async deleteAccount(email: string) {
    return this.prisma.user.delete({
      where: { email },
    });
  }

  async saveOrder(email: string, cart: any[], total: number) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('Usuário não encontrado');

    return this.prisma.order.create({
      data: {
        userId: user.id,
        total: total,
        items: {
          create: cart.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          }))
        }
      }
    });
  }

  async getOrders(email: string) {
    return this.prisma.order.findMany({
      where: { user: { email } },
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    });
  }
  async syncCart(email: string, cartItems: any[]) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('Usuário não encontrado');

    await this.prisma.cartItem.deleteMany({ where: { userId: user.id } });

    if (cartItems && cartItems.length > 0) {
      await this.prisma.cartItem.createMany({
        data: cartItems.map(item => ({
          userId: user.id,
          productId: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        })),
      });
    }
    return { message: 'Carrinho salvo com sucesso' };
  }

  async getCart(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('Usuário não encontrado');

    const items = await this.prisma.cartItem.findMany({
      where: { userId: user.id },
    });

    return items.map(item => ({
      id: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    }));
  }
}