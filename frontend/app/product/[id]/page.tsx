'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft, Loader2, PackageX } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/store/useStore';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  image: string;
}

export default function ProductPage() {
  const params = useParams();
  const { addToCart } = useStore();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) return;

      try {
        const response = await fetch(`http://localhost:3001/products/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Produto não encontrado no banco de dados');
        }
        
        const data: Product = await response.json();
        setProduct(data);
      } catch (error: unknown) {
        console.error("Erro ao buscar o produto:", error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center flex-col gap-4 text-white">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
        <p className="text-gray-400 font-medium">Carregando detalhes do produto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] text-white flex flex-col items-center justify-center p-6">
        <PackageX className="w-20 h-20 text-gray-600 mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Produto não encontrado</h1>
        <p className="text-gray-400 mb-8 text-center max-w-md">
          Não conseguimos localizar o produto que você tentou acessar. Ele pode estar fora de estoque ou o link é inválido.
        </p>
        <Link href="/products">
          <Button className="bg-indigo-600 hover:bg-indigo-700 h-12 px-8 font-bold rounded-xl">
            Voltar para o Catálogo
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white selection:bg-indigo-500/30">
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        
        <motion.nav initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link href="/products" className="inline-flex items-center text-gray-400 hover:text-white transition-colors group font-medium">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar aos produtos
          </Link>
        </motion.nav>

        <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          <motion.figure 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="relative rounded-3xl overflow-hidden bg-[#0f0f10] border border-white/5 aspect-square lg:h-[600px] shadow-2xl"
          >
            <Image 
              src={product.image} 
              alt={`Imagem principal do ${product.name}`} 
              fill 
              className="object-cover" 
              priority 
              quality={100} 
              sizes="(max-width: 768px) 100vw, 50vw" 
            />
          </motion.figure>

          <div className="space-y-8">
            <header>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
              >
                {product.name}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }}
                className="text-gray-400 text-lg border-l-2 border-indigo-500/30 pl-6 leading-relaxed"
              >
                {product.fullDescription || product.description}
              </motion.p>
            </header>
            
            <motion.section 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              className="bg-[#121214] p-8 rounded-3xl border border-white/5 space-y-8 shadow-xl"
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">Preço à vista</span>
                <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  {formatCurrency(product.price)}
                </span>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white h-14 text-lg font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all" 
                  onClick={() => addToCart(product)}
                >
                  Comprar Agora
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 w-14 p-0 border-white/10 hover:bg-white/5 hover:text-indigo-400 rounded-xl transition-colors" 
                  onClick={() => addToCart(product)}
                  aria-label="Adicionar ao carrinho"
                >
                  <ShoppingCart className="w-6 h-6" />
                </Button>
              </div>
            </motion.section>
          </div>
        </article>

      </div>
    </main>
  );
}