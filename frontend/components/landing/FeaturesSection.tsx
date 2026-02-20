'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Shield, CreditCard, Headphones, Zap, RefreshCw } from 'lucide-react';

const features = [
  { icon: Truck, title: 'Entrega Express', description: 'Receba em até 24h nas principais capitais do Brasil.' },
  { icon: Shield, title: 'Garantia Estendida', description: 'Até 3 anos de garantia em todos os produtos.' },
  { icon: CreditCard, title: 'Parcelamento', description: 'Em até 12x sem juros no cartão de crédito.' },
  { icon: Headphones, title: 'Suporte 24/7', description: 'Equipe especializada disponível a qualquer momento.' },
  { icon: Zap, title: 'Produtos Originais', description: 'Todos os itens são 100% originais e certificados.' },
  { icon: RefreshCw, title: 'Troca Facilitada', description: '30 dias para trocar ou devolver, sem burocracia.' }
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0a0a0b] to-[#0f0f12]">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-indigo-400 text-sm font-medium uppercase tracking-widest">Vantagens</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight">Por que nos escolher?</h2>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
                <feature.icon className="w-7 h-7 text-indigo-400" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed text-sm">{feature.description}</p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}