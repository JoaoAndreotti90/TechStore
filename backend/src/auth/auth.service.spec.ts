import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

async syncCart(email: string, cartItems: any[]) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('Usuário não encontrado');

    // Limpa os itens antigos para não duplicar
    await this.prisma.cartItem.deleteMany({ where: { userId: user.id } });

    // Salva os novos itens no banco
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

    // Converte de volta para o formato que o seu frontend entende
    return items.map(item => ({
      id: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    }));
  }
