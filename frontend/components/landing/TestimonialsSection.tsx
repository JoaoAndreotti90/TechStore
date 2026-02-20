'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Carlos Mendes',
    role: 'Designer de Produto',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    content: 'Qualidade excepcional! O notebook que comprei superou todas as minhas expectativas. Performance incrível.',
    rating: 5
  },
  {
    name: 'Ana Paula Silva',
    role: 'Dev Full Stack',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    content: 'Melhor loja de tecnologia que já conheci. Entrega rápida, produtos originais e suporte excepcional.',
    rating: 5
  },
  {
    name: 'Roberto Alves',
    role: 'Fotógrafo',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    content: 'A câmera que adquiri aqui mudou completamente meu trabalho. Qualidade profissional a um preço justo.',
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-32 bg-[#0a0a0b] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-indigo-400 text-sm font-bold uppercase tracking-widest">Depoimentos</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6 tracking-tight">O que dizem nossos clientes</h2>
            <p className="text-gray-400 font-medium">Mais de 50.000 clientes satisfeitos em todo o Brasil</p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/5 hover:border-indigo-500/20 transition-colors shadow-lg"
            >
              <Quote className="w-8 h-8 text-indigo-500 mb-6 opacity-50" aria-hidden="true" />
              <blockquote className="text-gray-300 font-medium mb-8 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              
              <footer className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500/30">
                  <Image 
                    src={testimonial.avatar} 
                    alt={`Foto de perfil de ${testimonial.name}`} 
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm tracking-wide">{testimonial.name}</h4>
                  <p className="text-indigo-400 font-medium text-xs uppercase tracking-wider">{testimonial.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5" aria-label={`Avaliado com ${testimonial.rating} de 5 estrelas`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" aria-hidden="true" />
                  ))}
                </div>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}