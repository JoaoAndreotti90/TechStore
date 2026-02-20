export interface StaticProduct {
  id: number;
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  image: string;
  features: string[];
}

export const products: StaticProduct[] = [
  {
    id: 1,
    name: 'AirPods Pro Max',
    category: 'Áudio',
    description: 'Som imersivo com cancelamento de ruído adaptativo e áudio espacial personalizado.',
    fullDescription: 'Os AirPods Max reinventam os fones de ouvido over-ear. Um driver dinâmico projetado pela Apple oferece som imersivo de alta fidelidade. Cada detalhe, do arco às almofadas, foi projetado para um ajuste excepcional.',
    price: 4499,
    originalPrice: 5299,
    badge: 'Novo',
    image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=1600&q=95',
    features: ['Cancelamento Ativo de Ruído', 'Áudio Espacial', '20h de bateria', 'Chip H1']
  },
  {
    id: 2,
    name: 'MacBook Pro M3',
    category: 'Notebooks',
    description: 'O notebook mais poderoso para profissionais, agora com chip M3.',
    fullDescription: 'Com os chips M3, M3 Pro e M3 Max, o MacBook Pro avança ainda mais. Bateria para o dia todo e uma tela Liquid Retina XDR impressionante tornam este o notebook profissional definitivo.',
    price: 12999,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1600&q=95',
    features: ['Chip M3 Pro', '32GB RAM', '1TB SSD', 'Tela XDR 120Hz']
  },
  {
    id: 3,
    name: 'SmartWatch Ultra',
    category: 'Wearables',
    description: 'O relógio definitivo para atletas e aventuras extremas.',
    fullDescription: 'A caixa de titânio aeroespacial oferece o equilíbrio perfeito entre peso, solidez e resistência à corrosão. A tela é duas vezes mais brilhante que qualquer outro modelo.',
    price: 3299,
    originalPrice: 3799,
    badge: '-13%',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1600&q=95',
    features: ['GPS Dupla Frequência', 'Titânio', 'Bateria 36h', 'Profundímetro']
  },
  {
    id: 4,
    name: 'Sony Alpha a7 IV',
    category: 'Fotografia',
    description: 'Sensor full-frame 33MP com vídeo 4K 60p e foco em tempo real.',
    fullDescription: 'Uma câmera híbrida que entrega fotos estonteantes e vídeos cinematográficos. O sistema de foco automático com IA rastreia olhos de humanos, animais e pássaros com precisão absurda.',
    price: 18999,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&q=95',
    features: ['33MP Full-Frame', 'Vídeo 4K 60p', 'Estabilização 5 eixos', 'Foco Eye-AF']
  },
  {
    id: 5,
    name: 'PlayStation 5 Controller',
    category: 'Gaming',
    description: 'Sinta suas ações no jogo e o ambiente simulado através da resposta tátil.',
    fullDescription: 'O controle sem fio DualSense oferece resposta tátil imersiva, gatilhos adaptáveis dinâmicos e um microfone integrado, tudo em um design icônico e confortável.',
    price: 499,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1606318801954-d46d46d3360a?w=1600&q=95',
    features: ['Resposta Tátil', 'Gatilhos Adaptáveis', 'Microfone Integrado', 'Bateria Recarregável']
  },
  {
    id: 6,
    name: 'DJI Mavic 3',
    category: 'Drones',
    description: 'Câmera Hasselblad CMOS 4/3 para imagens aéreas de nível profissional.',
    fullDescription: 'Capture imagens lendárias com a lendária câmera Hasselblad. O Mavic 3 oferece detecção de obstáculos omnidirecional para um voo suave e seguro em ambientes complexos.',
    price: 8999,
    originalPrice: 10499,
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=1600&q=95',
    features: ['Câmera 4/3 CMOS', '46 min de Voo', 'Transmissão 15km', 'Vídeo 5.1K']
  }
];