'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, SearchX } from 'lucide-react';
import { motion } from 'framer-motion';

function ProductGrid() {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');
  const search = searchParams.get('search');

  const filteredProducts = products.filter(product => {
    let matchesSearch = true;
    let matchesFilter = true;

    if (search) {
      matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    }

    if (filter === 'ofertas') {
      matchesFilter = product.originalPrice !== undefined;
    } else if (filter === 'novidades') {
      matchesFilter = product.badge === 'Novo' || product.badge === 'New';
    }

    return matchesSearch && matchesFilter;
  });

  const pageTitle = search 
    ? `Resultados para "${search}"` 
    : filter === 'ofertas' 
      ? 'Ofertas Especiais' 
      : filter === 'novidades' 
        ? 'Lançamentos' 
        : 'Todos os Produtos';

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 relative z-10">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{pageTitle}</h1>
        <p className="text-gray-400 font-medium">{filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}</p>
      </header>

      {filteredProducts.length === 0 ? (
        <section className="flex flex-col items-center justify-center py-20 text-center">
          <SearchX className="w-16 h-16 text-gray-600 mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">Nenhum produto encontrado</h2>
          <p className="text-gray-400 max-w-md">
            Não encontramos nenhum produto que corresponda à sua busca. Tente usar outras palavras-chave ou remover os filtros.
          </p>
        </section>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative"
            >
              <Link href={`/product/${product.id}`} className="block h-full focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-3xl">
                <div className="group relative bg-gradient-to-b from-white/[0.08] to-transparent rounded-3xl p-1 h-full hover:-translate-y-2 transition-transform duration-300">
                  <div className="bg-[#0f0f10] rounded-[22px] p-6 h-full flex flex-col">
                    
                    <figure className="relative aspect-square rounded-2xl overflow-hidden bg-gray-900 mb-6">
                      <Image 
                        src={product.image} 
                        alt={`Imagem do produto ${product.name}`} 
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      {product.badge && (
                        <span className="absolute top-4 left-4 px-3 py-1 bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg z-10">
                          {product.badge}
                        </span>
                      )}
                    </figure>

                    <div className="space-y-3 flex-1">
                      <p className="text-xs text-indigo-400 font-medium uppercase tracking-wider">{product.category}</p>
                      <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </div>

                    <footer className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                      <div className="flex flex-col">
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through decoration-red-500/50">
                            {formatCurrency(product.originalPrice)}
                          </span>
                        )}
                        <span className="text-2xl font-bold text-white tracking-tight">
                          {formatCurrency(product.price)}
                        </span>
                      </div>
                      <div 
                        className="bg-white/10 group-hover:bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors shadow-lg"
                        aria-label="Ver detalhes do produto"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </div>
                    </footer>

                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </section>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white selection:bg-indigo-500/30">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center text-indigo-500 font-medium">
          Carregando catálogo...
        </div>
      }>
        <ProductGrid />
      </Suspense>
    </main>
  );
}