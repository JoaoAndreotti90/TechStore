'use client';

import React, { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { X, Trash2, ShoppingBag, ArrowRight, Minus, Plus, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CartSidebar() {
  const { 
    cart, 
    isCartOpen, 
    toggleCart, 
    removeFromCart, 
    addToCart, 
    decrementQuantity, 
    total,
    user 
  } = useStore();

  const router = useRouter();
  
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    setErrorMessage('');
    toggleCart();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isCartOpen]);

  const handleCheckout = async () => {
    if (!user) {
      handleClose();
      router.push('/login');
      return;
    }

    setIsCheckoutLoading(true);
    setErrorMessage('');

    try {
      const itemsParaOBackend = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }));

      const response = await fetch('http://localhost:3001/checkout/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ items: itemsParaOBackend, email: user.email }), 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Falha ao criar sessão de pagamento');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Erro ao conectar com o provedor de pagamento. Tente novamente.');
      }
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 z-[60]"
            aria-hidden="true"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Carrinho de Compras"
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.25 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0f0f10] border-l border-white/10 z-[70] flex flex-col will-change-transform shadow-2xl"
          >
            <header className="p-5 border-b border-white/5 flex items-center justify-between bg-[#0f0f10]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-indigo-500" />
                Seu Carrinho
                <span className="text-sm font-normal text-gray-500">
                  ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                </span>
              </h2>
              <button 
                onClick={handleClose} 
                className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                aria-label="Fechar carrinho"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-400">Seu carrinho está vazio.</p>
                  <Button 
                    variant="outline" 
                    onClick={handleClose} 
                    className="border-white/10 hover:bg-white/5 text-white"
                  >
                    Começar a comprar
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li key={item.id} className="flex gap-4 bg-white/5 p-3 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-colors">
                      <div className="relative w-20 h-20 bg-black rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                        <Image 
                          src={item.image} 
                          alt={`Imagem do produto ${item.name}`} 
                          fill 
                          className="object-cover" 
                          sizes="80px" 
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-white text-sm line-clamp-1" title={item.name}>
                            {item.name}
                          </h4>
                          <button 
                            onClick={() => removeFromCart(item.id)} 
                            className="text-gray-500 hover:text-red-400 p-1 -mt-1 -mr-1 transition-colors"
                            aria-label={`Remover ${item.name} do carrinho`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-indigo-400 font-bold text-sm">
                            {formatCurrency(item.price)}
                          </span>

                          <div className="flex items-center gap-3 bg-black/40 rounded-lg px-2 py-1 border border-white/5">
                            <button 
                              onClick={() => decrementQuantity(item.id)}
                              className="text-gray-400 hover:text-white transition-colors p-0.5"
                              aria-label={`Diminuir quantidade do produto ${item.name}`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            
                            <span className="text-sm font-medium text-white min-w-[12px] text-center select-none" aria-label={`Quantidade atual é ${item.quantity}`}>
                              {item.quantity}
                            </span>
                            
                            <button 
                              onClick={() => addToCart(item)}
                              className="text-gray-400 hover:text-white transition-colors p-0.5"
                              aria-label={`Aumentar quantidade do produto ${item.name}`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <footer className="p-5 border-t border-white/10 bg-[#0f0f10] space-y-4">
                <div className="flex justify-between items-center text-white text-lg font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(total())}</span>
                </div>
                
                {errorMessage && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm flex items-start gap-3"
                    role="alert"
                  >
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>{errorMessage}</p>
                  </motion.div>
                )}
                
                <Button 
                  onClick={handleCheckout}
                  disabled={isCheckoutLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-base font-bold rounded-lg flex items-center justify-between px-6 transition-all active:scale-95 disabled:opacity-70"
                >
                  {isCheckoutLoading ? (
                    <div className="flex items-center justify-center w-full gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processando...</span>
                    </div>
                  ) : (
                    <>
                      <span>Finalizar Compra</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-gray-600 flex items-center justify-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" aria-hidden="true"/>
                  Ambiente Seguro
                </p>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}