'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    setIsSuccess(false);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section className="py-32 bg-[#0a0a0b] relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[32px] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600" />
          <div className="relative z-10 p-12 md:p-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Receba ofertas exclusivas</h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Inscreva-se na nossa newsletter e seja o primeiro a saber sobre lançamentos e promoções especiais.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <label htmlFor="newsletter-email" className="sr-only">Seu melhor e-mail</label>
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                <Input 
                  id="newsletter-email"
                  type="email" 
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail" 
                  className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 h-12" 
                />
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting || !email}
                size="lg" 
                className="bg-white text-indigo-600 hover:bg-gray-100 rounded-full font-bold group disabled:opacity-80 h-12 px-8 shadow-xl"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Inscrevendo</>
                ) : (
                  <>Inscrever <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                )}
              </Button>
            </form>

            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex items-center justify-center gap-2 text-green-300 text-sm font-medium bg-green-900/40 w-fit mx-auto px-4 py-2 rounded-full border border-green-500/30"
                role="status"
              >
                <CheckCircle className="w-4 h-4" />
                Inscrição confirmada com sucesso!
              </motion.div>
            )}

            {!isSuccess && (
              <p className="text-white/50 text-xs mt-6 font-medium">Ao se inscrever, você concorda com nossos termos de uso.</p>
            )}
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}