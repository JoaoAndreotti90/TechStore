'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { Loader2 } from 'lucide-react';

function LoginSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useStore();

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      router.push('/login');
      return;
    }

    localStorage.setItem('techstore-token', token);

    fetch('https://techstore-qzd2.onrender.com/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      if (!res.ok) throw new Error('Falha ao buscar perfil');
      return res.json();
    })
    .then((userData) => {
      login({
        name: userData.name || 'Usuário Google',
        email: userData.email,
        phone: userData.phone || '',
        address: userData.address || '',
      });
      
      if (userData.phone && userData.address) {
        router.push('/');
      } else {
        router.push('/profile');
      }
    })
    .catch((err) => {
      console.error(err);
      router.push('/login');
    });
  }, [searchParams, router, login]);

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center flex-col gap-4 text-white">
      <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
      <p className="text-gray-400">Carregando seus dados...</p>
    </div>
  );
}

export default function LoginSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center"><Loader2 className="w-10 h-10 text-indigo-500 animate-spin" /></div>}>
      <LoginSuccessContent />
    </Suspense>
  );
}