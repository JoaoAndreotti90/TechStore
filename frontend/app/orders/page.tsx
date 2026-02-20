'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface OrderItem {
  id: number;
  productId: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: number;
  createdAt: string;
  status: string;
  total: number;
  items: OrderItem[];
}

export default function OrdersPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('techstore-token');
      
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:3001/auth/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('Falha ao buscar os pedidos');

        const data: Order[] = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('Erro ao carregar pedidos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-12">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Package className="w-8 h-8 text-indigo-500" />
            Meus Pedidos
          </h1>
          <p className="text-gray-400 mt-2">Acompanhe o status e o histórico das suas compras.</p>
        </header>

        {orders.length === 0 ? (
          <section className="bg-[#0f0f10] border border-white/5 rounded-3xl p-12 text-center flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <Package className="w-12 h-12 text-gray-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">Nenhum pedido encontrado</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Parece que você ainda não realizou nenhuma compra ou seus pedidos ainda estão sendo processados.
            </p>
            <Link href="/">
              <Button className="bg-indigo-600 hover:bg-indigo-700 h-12 px-8 font-bold rounded-xl">
                Explorar Produtos <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </section>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <article key={order.id} className="bg-[#0f0f10] border border-white/5 rounded-3xl overflow-hidden">
                
                <header className="bg-white/5 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5">
                  <div>
                    <p className="text-sm text-gray-400">Pedido #{order.id}</p>
                    <p className="font-medium text-white">
                      Realizado em: {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full text-sm font-medium w-fit">
                    <CheckCircle2 className="w-4 h-4" />
                    {order.status}
                  </div>
                </header>

                <section className="p-6 space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative w-16 h-16 bg-black rounded-lg overflow-hidden border border-white/5 flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-gray-400 text-sm">Qtd: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-indigo-400">{formatCurrency(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </section>

                <footer className="bg-white/5 p-6 flex justify-between items-center border-t border-white/5">
                  <span className="text-gray-400 font-medium">Total do Pedido</span>
                  <span className="text-xl font-bold text-white">{formatCurrency(order.total)}</span>
                </footer>

              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}