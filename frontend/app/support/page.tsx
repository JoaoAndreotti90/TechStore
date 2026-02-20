'use client';

import React, { useState } from 'react';
import { Mail, MapPin, MessageCircle, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SupportPage() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white selection:bg-indigo-500/30">
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 relative z-10">
        
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Central de Ajuda</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Estamos aqui para ajudar. Se você tiver alguma dúvida sobre seu pedido, produto ou garantia, entre em contato.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <section className="space-y-8">
            <address className="bg-[#0f0f10] p-8 rounded-3xl border border-white/5 space-y-6 not-italic shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Canais de Atendimento</h2>
              
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">E-mail</p>
                  <a href="mailto:Andreotti@techstore.com.br" className="font-medium hover:text-indigo-400 transition-colors">
                    Andreotti@techstore.com.br
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">WhatsApp</p>
                  <p className="font-medium">(14) 99152-7437</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Escritório</p>
                  <p className="font-medium">Av. Paulista, 1000 - São Paulo, SP</p>
                </div>
              </div>
            </address>
          </section>

          <section className="bg-[#0f0f10] p-8 rounded-3xl border border-white/5 flex flex-col justify-center shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Envie uma mensagem</h2>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm text-gray-400 font-medium">Nome</label>
                  <Input 
                    id="firstName"
                    required
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    placeholder="Seu nome" 
                    className="bg-black/20 border-white/10 text-white focus:border-indigo-500" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm text-gray-400 font-medium">Sobrenome</label>
                  <Input 
                    id="lastName"
                    required
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    placeholder="Sobrenome" 
                    className="bg-black/20 border-white/10 text-white focus:border-indigo-500" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-gray-400 font-medium">E-mail</label>
                <Input 
                  id="email"
                  required
                  type="email" 
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="seu@email.com" 
                  className="bg-black/20 border-white/10 text-white focus:border-indigo-500" 
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-gray-400 font-medium">Mensagem</label>
                <textarea 
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full h-32 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:border-indigo-500 resize-none transition-colors"
                  placeholder="Como podemos ajudar?"
                />
              </div>

              {isSuccess && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium">
                  <CheckCircle className="w-5 h-5" />
                  Mensagem enviada com sucesso!
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-lg font-bold disabled:opacity-70 shadow-lg shadow-indigo-500/20 transition-all"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Enviando...</>
                ) : (
                  'Enviar Mensagem'
                )}
              </Button>
            </form>
          </section>

        </div>
      </div>
    </main>
  );
}