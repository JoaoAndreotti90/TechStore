'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  image: string;
}

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:3001/products');
        if (!response.ok) throw new Error('Falha na API');
        const data = await response.json();
        setProducts(data);
      } catch (error: unknown) {
        console.error("Erro ao buscar produtos:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <section className="py-32 bg-[#0a0a0b] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-indigo-400 text-sm font-bold uppercase tracking-widest">
              Catálogo
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6 tracking-tight">
              Produtos em Destaque
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              Selecionamos os melhores dispositivos para você. Qualidade premium, 
              tecnologia de ponta e design impecável.
            </p>
          </motion.div>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center py-20" role="status" aria-label="Carregando produtos">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
          </div>
        ) : error ? (
           <div className="flex flex-col items-center justify-center py-20 text-center text-red-400 bg-red-500/10 rounded-3xl border border-red-500/20 max-w-2xl mx-auto">
             <AlertCircle className="w-12 h-12 mb-4" />
             <p className="font-bold text-lg">Não foi possível carregar os produtos.</p>
             <p className="text-sm">Verifique se o backend está rodando e tente recarregar a página.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map((product, index) => ( 
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <Link href={`/product/${product.id}`} className="block h-full focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-3xl">
                  <div className="group relative bg-gradient-to-b from-white/[0.08] to-transparent rounded-3xl p-1 h-full hover:-translate-y-2 transition-transform duration-300">
                    <div className="bg-[#0f0f10] rounded-[22px] p-6 h-full flex flex-col">
                      
                      <figure className="relative aspect-square rounded-2xl overflow-hidden bg-gray-900 mb-6">
                        <Image 
                          src={product.image}
                          alt={`Imagem do ${product.name}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        
                        {product.badge && (
                          <span className="absolute top-4 left-4 px-3 py-1 bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg z-10">
                            {product.badge}
                          </span>
                        )}
                      </figure>

                      <div className="space-y-3 flex-1">
                        <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider">
                          {product.category}
                        </p>
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <footer className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                        <div className="flex flex-col">
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 font-medium line-through decoration-red-500/50">
                              {formatCurrency(product.originalPrice)}
                            </span>
                          )}
                          <span className="text-2xl font-bold text-white block tracking-tight">
                            {formatCurrency(product.price)}
                          </span>
                        </div>
                        
                        <div 
                          className="bg-white/10 group-hover:bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors shadow-lg"
                          aria-label={`Ver detalhes do ${product.name}`}
                        >
                          <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                        </div>
                      </footer>

                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}