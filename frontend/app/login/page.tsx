'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const router = useRouter();
  const { login } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const endpoint = isLogin 
        ? 'http://localhost:3001/auth/login' 
        : 'http://localhost:3001/auth/register';
      
      const payload = isLogin 
        ? { email, password } 
        : { name, email, password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ocorreu um erro ao processar sua solicitação.');
      }

      localStorage.setItem('techstore-token', data.access_token);

      login({
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone || '',
        address: data.user.address || ''
      });

      if (data.user.phone && data.user.address) {
        router.push('/');
      } else {
        router.push('/profile');
      }

    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg('Ocorreu um erro inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    window.location.href = 'http://localhost:3001/auth/google';
  };

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px]" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <div className="bg-[#0f0f10] border border-white/5 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
            </h1>
            <p className="text-gray-400 text-sm">
              {isLogin ? 'Entre para acessar suas compras e configurações.' : 'Preencha seus dados para começar.'}
            </p>
          </div>

          <div className="bg-white/5 p-1 rounded-full flex mb-8">
            <button
              onClick={() => { setIsLogin(true); setErrorMsg(''); }}
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${isLogin ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Entrar
            </button>
            <button
              onClick={() => { setIsLogin(false); setErrorMsg(''); }}
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${!isLogin ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Cadastrar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs text-gray-500 ml-1">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input 
                    id="name"
                    autoComplete="name"
                    placeholder="Seu nome" 
                    className="pl-12 bg-black/20 border-white/10 h-12 text-white" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required={!isLogin} 
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-xs text-gray-500 ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input 
                  id="email"
                  type="email" 
                  autoComplete="email"
                  placeholder="seu@email.com" 
                  className="pl-12 bg-black/20 border-white/10 h-12 text-white" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-xs text-gray-500 ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input 
                  id="password"
                  type="password" 
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  placeholder="••••••••" 
                  className="pl-12 bg-black/20 border-white/10 h-12 text-white" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  minLength={6} 
                />
              </div>
            </div>

            {errorMsg && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm text-center font-medium">
                {errorMsg}
              </motion.p>
            )}

            <Button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-lg font-bold rounded-xl mt-4" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span className="flex items-center">{isLogin ? 'Entrar' : 'Criar Conta'} <ArrowRight className="ml-2 w-4 h-4" /></span>}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0f0f10] px-2 text-gray-500">Ou continue com</span></div>
          </div>

          <Button type="button" variant="outline" className="w-full h-12 border-white/10 hover:bg-white/5 gap-2 rounded-xl text-white" onClick={handleGoogleLogin} disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Chrome className="w-5 h-5" />} 
            <span>Google</span>
          </Button>

        </div>
      </motion.div>
    </main>
  );
}