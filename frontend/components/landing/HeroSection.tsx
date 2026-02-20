'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0b] pt-32 pb-20">
      
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-[128px]" aria-hidden="true" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/20 rounded-full blur-[128px]" aria-hidden="true" />
      
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), 
                          linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center w-full">
        <header>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm shadow-lg">
              <Sparkles className="w-4 h-4 text-indigo-400" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-300">Novidades 2026 já disponíveis</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-6"
          >
            Tecnologia que
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              transforma
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl font-medium text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Descubra a nova geração de dispositivos que combinam design excepcional 
            com performance extraordinária. O futuro está aqui.
          </motion.p>
        </header>

        <motion.nav
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          aria-label="Ações Principais"
        >
          <Link href="/products" className="w-full sm:w-auto">
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-white text-black hover:bg-gray-100 font-bold group h-14 px-8 rounded-full shadow-xl shadow-white/10"
            >
              Explorar Produtos
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
          </Link>

          <Link href="/products?filter=novidades" className="w-full sm:w-auto">
            <Button 
              size="lg"
              variant="outline"
              className="w-full sm:w-auto font-bold h-14 px-8 rounded-full border-white/20 text-white hover:bg-white/10"
            >
              Ver Lançamentos
            </Button>
          </Link>
        </motion.nav>

        <Link href="/product/2" aria-label="Ver detalhes do MacBook Pro em destaque"> 
          <motion.figure
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            className="relative mx-auto max-w-5xl cursor-pointer group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-2xl opacity-30 animate-pulse group-hover:opacity-50 transition-opacity duration-500" aria-hidden="true" />
            
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-video bg-gray-900">
              <Image 
                src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1600&q=95" 
                alt="MacBook Pro flutuando iluminado" 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-60" aria-hidden="true" />
            </div>
          </motion.figure>
        </Link>

      </div>
    </section>
  );
}