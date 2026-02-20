'use client';

import React, { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, Phone, MapPin, LogOut, Save, Trash2, AlertTriangle, Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout, login } = useStore();
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('techstore-token');

    if (!user) {
      if (token) {
        fetch('http://localhost:3001/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
          if (!res.ok) throw new Error('Token inválido');
          return res.json();
        })
        .then(userData => {
          login({
            name: userData.name,
            email: userData.email,
            phone: userData.phone || '',
            address: userData.address || ''
          });
          setIsLoadingProfile(false);
        })
        .catch(() => {
          localStorage.removeItem('techstore-token');
          router.push('/login');
        });
      } else {
        router.push('/login');
      }
    } else {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setIsLoadingProfile(false);
    }
  }, [user, router, login]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!user) return;
    
    setIsSaving(true);
    setMessage('');
    
    try {
      const token = localStorage.getItem('techstore-token');
      const response = await fetch('http://localhost:3001/auth/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, phone, address }),
      });

      if (!response.ok) throw new Error('Falha ao atualizar no banco');

      login({ ...user, name, email, phone, address });
      setMessage('Dados salvos com sucesso!');
      
      setTimeout(() => {
        router.push('/');
      }, 1000);

    } catch (error: unknown) {
      console.error(error);
      setMessage('Erro ao salvar. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('techstore-token');
    logout();
    router.push('/');
  };

  const confirmDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('techstore-token');
      const response = await fetch('http://localhost:3001/auth/me', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Falha ao excluir a conta');

      localStorage.removeItem('techstore-token');
      logout();
      router.push('/');
    } catch (error: unknown) {
      console.error(error);
      alert('Erro ao excluir a conta. Tente novamente.');
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center flex-col gap-4">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
        <p className="text-gray-400">Restaurando sessão...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight">
            Olá, {user?.name ? user.name.split(' ')[0] : 'Usuário'}!
          </h1>
          <p className="text-gray-400 mt-2">Gerencie seus dados e informações de entrega.</p>
        </header>

        <section className="bg-[#0f0f10] border border-white/5 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-500" />
            Dados Pessoais
          </h2>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-gray-400 font-medium">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500" />
                  <Input 
                    id="name"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="pl-10 bg-black/20 border-white/10 focus:border-indigo-500 text-white" 
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-gray-400 font-medium">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500" />
                  <Input 
                    id="email"
                    value={email} 
                    disabled 
                    className="pl-10 bg-black/20 border-white/10 text-gray-500 cursor-not-allowed" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm text-gray-400 font-medium">Telefone / WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500" />
                  <Input 
                    id="phone"
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="(14) 99999-9999" 
                    className="pl-10 bg-black/20 border-white/10 focus:border-indigo-500 text-white" 
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="address" className="text-sm text-gray-400 font-medium">Endereço de Entrega</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500" />
                  <Input 
                    id="address"
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="Rua, Número, Bairro, Cidade - SP" 
                    className="pl-10 bg-black/20 border-white/10 focus:border-indigo-500 text-white" 
                    autoComplete="street-address"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col items-stretch md:items-end gap-3 border-t border-white/5 mt-6">
              {message && <span className="text-green-400 text-sm text-center md:text-right font-medium">{message}</span>}
              <Button 
                type="submit" 
                disabled={isSaving} 
                className="bg-indigo-600 hover:bg-indigo-700 w-full md:w-auto md:min-w-[150px] shadow-lg shadow-indigo-500/20"
              >
                {isSaving ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Salvando...</>
                ) : (
                  <><Save className="w-4 h-4 mr-2" /> Salvar Alterações</>
                )}
              </Button>
            </div>
          </form>
        </section>

        <section className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4">
          <Button variant="ghost" onClick={handleLogout} className="text-gray-400 hover:text-white hover:bg-white/10 gap-2 w-full md:w-auto">
            <LogOut className="w-4 h-4" /> Sair da minha conta
          </Button>

          <Button variant="ghost" onClick={() => setShowDeleteModal(true)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-2 w-full md:w-auto">
            <Trash2 className="w-4 h-4" /> Excluir Conta
          </Button>
        </section>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#121214] border border-white/10 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-6 mx-auto">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-center text-white mb-2 tracking-tight">Excluir Conta?</h3>
            <p className="text-gray-400 text-center mb-8">Tem certeza que deseja excluir sua conta para sempre? Isso não pode ser desfeito.</p>
            <div className="flex flex-col gap-3">
              <Button onClick={confirmDeleteAccount} className="w-full bg-red-600 hover:bg-red-700 h-12 text-base font-bold rounded-xl shadow-lg shadow-red-500/20">
                Sim, Excluir Conta
              </Button>
              <Button variant="ghost" onClick={() => setShowDeleteModal(false)} className="w-full h-12 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium">
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}