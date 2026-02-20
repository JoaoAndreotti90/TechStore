import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Começando o seed...');

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: 'AirPods Pro Max',
        category: 'Áudio',
        description: 'Som imersivo com cancelamento de ruído adaptativo e áudio espacial personalizado.',
        fullDescription: 'Os AirPods Max reinventam os fones de ouvido over-ear. Um driver dinâmico projetado pela Apple oferece som imersivo de alta fidelidade.',
        price: 4499.00,
        originalPrice: 5299.00,
        badge: 'Novo',
        image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=1600&q=95',
        features: ['Cancelamento Ativo de Ruído', 'Áudio Espacial', '20h de bateria', 'Chip H1']
      },
      {
        name: 'MacBook Pro M3',
        category: 'Notebooks',
        description: 'O notebook mais poderoso para profissionais, agora com chip M3.',
        fullDescription: 'Com os chips M3, M3 Pro e M3 Max, o MacBook Pro avança ainda mais. Bateria para o dia todo e uma tela Liquid Retina XDR impressionante.',
        price: 12999.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1600&q=95',
        features: ['Chip M3 Pro', '32GB RAM', '1TB SSD', 'Tela XDR 120Hz']
      },
      {
        name: 'SmartWatch Ultra',
        category: 'Wearables',
        description: 'O relógio definitivo para atletas e aventuras extremas.',
        fullDescription: 'A caixa de titânio aeroespacial oferece o equilíbrio perfeito entre peso, solidez e resistência à corrosão.',
        price: 3299.00,
        originalPrice: 3799.00,
        badge: '-13%',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1600&q=95',
        features: ['GPS Dupla Frequência', 'Titânio', 'Bateria 36h', 'Profundímetro']
      },
      {
        name: 'Sony Alpha a7 IV',
        category: 'Fotografia',
        description: 'Sensor full-frame 33MP com vídeo 4K 60p e foco em tempo real.',
        fullDescription: 'Uma câmera híbrida que entrega fotos estonteantes e vídeos cinematográficos. O sistema de foco automático com IA rastreia olhos.',
        price: 18999.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&q=95',
        features: ['33MP Full-Frame', 'Vídeo 4K 60p', 'Estabilização 5 eixos', 'Foco Eye-AF']
      },
      {
        name: 'PlayStation 5 Controller',
        category: 'Gaming',
        description: 'Sinta suas ações no jogo e o ambiente simulado através da resposta tátil.',
        fullDescription: 'O controle sem fio DualSense oferece resposta tátil imersiva, gatilhos adaptáveis dinâmicos e um microfone integrado.',
        price: 499.00,
        originalPrice: null,
        badge: 'Bestseller',
        image: 'https://images.unsplash.com/photo-1606318801954-d46d46d3360a?w=1600&q=95',
        features: ['Resposta Tátil', 'Gatilhos Adaptáveis', 'Microfone Integrado', 'Bateria Recarregável']
      },
      {
        name: 'DJI Mavic 3',
        category: 'Drones',
        description: 'Câmera Hasselblad CMOS 4/3 para imagens aéreas de nível profissional.',
        fullDescription: 'Capture imagens lendárias com a lendária câmera Hasselblad. O Mavic 3 oferece detecção de obstáculos omnidirecional.',
        price: 8999.00,
        originalPrice: 10499.00,
        image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=1600&q=95',
        features: ['Câmera 4/3 CMOS', '46 min de Voo', 'Transmissão 15km', 'Vídeo 5.1K']
      }
    ]
  });

  await prisma.user.create({
    data: {
      name: 'Usuário Demo',
      email: 'demo@techstore.com',
      password: '123',
      role: 'USER',
      phone: '(11) 99999-9999',
      address: 'Rua das Flores, 123'
    }
  });

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });