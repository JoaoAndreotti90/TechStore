'use client';

import React, { useEffect, useRef, Suspense } from 'react';
import { useStore } from '@/store/useStore';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight, ShoppingBag, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

function SuccessContent() {
  const { clearCart } = useStore();
  const searchParams = useSearchParams();
  const hasVerified = useRef(false);

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get('session_id');

      if (sessionId && !hasVerified.current) {
        hasVerified.current = true;

        try {
          const res = await fetch(`https://techstore-qzd2.onrender.com/checkout/verify?session_id=${sessionId}`);
          if (!res.ok) throw new Error('Falha na verificação do pagamento');
          
          const data = await res.json();
          if (data.success) {
            clearCart();
          }
        } catch (error: unknown) {
          console.error(error);
        }
      }
    };

    verifyPayment();
  }, [searchParams, clearCart]);

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg bg-[#0f0f10] border border-white/5 rounded-3xl p-10 text-center shadow-2xl relative z-10"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-12 h-12 text-green-500" />
      </motion.div>

      <h1 className="text-3xl font-bold mb-4">Pagamento Aprovado!</h1>
      <p className="text-gray-400 mb-8 leading-relaxed">
        Sua compra foi salva e processada com sucesso. Em breve você receberá um e-mail com os detalhes do pedido e o código de rastreio.
      </p>

      <footer className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/orders">
          <Button variant="outline" className="w-full sm:w-auto h-12 border-white/10 hover:bg-white/5 gap-2 px-6 text-white">
            <ShoppingBag className="w-4 h-4" />
            Ver meus pedidos
          </Button>
        </Link>

        <Link href="/">
          <Button className="w-full sm:w-auto h-12 bg-indigo-600 hover:bg-indigo-700 font-bold gap-2 px-6">
            Continuar Comprando
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </footer>
    </motion.section>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <Suspense fallback={<Loader2 className="w-10 h-10 text-indigo-500 animate-spin relative z-10" />}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}