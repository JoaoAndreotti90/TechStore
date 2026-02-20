'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ShoppingCart, Search, User, Menu, X, ChevronRight, LogIn, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const navLinks = [
  { name: 'Produtos', href: '/products' },
  { name: 'Ofertas', href: '/products?filter=ofertas' },
  { name: 'Novidades', href: '/products?filter=novidades' },
  { name: 'Suporte', href: '/support' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  
  const { cart, toggleCart, user } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); 

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      router.push(`/products?search=${encodeURIComponent(localSearch.trim())}`);
      setIsSearchOpen(false);
      setLocalSearch('');
    }
  };

  return (
    <>
      <motion.nav
        role="navigation"
        aria-label="Navegação Principal"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isMobileMenuOpen ? 'bg-[#0a0a0b]/95 backdrop-blur-xl border-b border-white/5 shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            
            <AnimatePresence>
              {(!isSearchOpen || window.innerWidth >= 768) && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="flex-shrink-0"
                >
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)} aria-label="Ir para a página inicial">
                    <div className="flex items-center gap-2 cursor-pointer group">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Cpu className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                      <span className="text-xl font-bold text-white tracking-tight hidden xs:block">TechStore</span>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {!isSearchOpen && (
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="text-gray-400 hover:text-white text-sm font-bold tracking-wide transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </div>
            )}

            <AnimatePresence>
              {isSearchOpen && (
                <motion.form 
                  role="search"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSearch}
                  className="absolute inset-0 z-50 flex items-center px-4 bg-[#0a0a0b] md:relative md:bg-transparent md:p-0 md:flex-1 md:max-w-md md:mx-auto"
                >
                  <div className="relative w-full flex items-center gap-2">
                    <label htmlFor="search-input" className="sr-only">Pesquisar produtos</label>
                    <Search className="absolute left-4 w-5 h-5 text-gray-500" aria-hidden="true" />
                    <input
                      id="search-input"
                      type="search"
                      placeholder="O que você procura?"
                      autoFocus
                      value={localSearch}
                      onChange={(e) => setLocalSearch(e.target.value)}
                      onKeyDown={(e) => e.key === 'Escape' && setIsSearchOpen(false)}
                      className="w-full bg-white/10 border border-white/10 rounded-full pl-12 pr-12 py-3 text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-500"
                    />
                    <button 
                      type="button" 
                      onClick={() => setIsSearchOpen(false)} 
                      className="absolute right-2 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                      aria-label="Fechar pesquisa"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <div className={`flex items-center gap-1 sm:gap-2 ${isSearchOpen ? 'hidden md:flex' : 'flex'}`}>
              
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full" onClick={() => setIsSearchOpen(true)} aria-label="Abrir pesquisa">
                <Search className="w-5 h-5" />
              </Button>
              
              <Link href={user ? "/orders" : "/login"} aria-label="Meus Pedidos">
                <Button variant="ghost" size="icon" className={`text-gray-400 hover:text-white hover:bg-white/5 rounded-full hidden sm:flex ${user ? 'text-indigo-400' : ''}`}>
                  <Package className="w-5 h-5" />
                </Button>
              </Link>
              
              <Link href={user ? "/profile" : "/login"} aria-label="Meu Perfil">
                <Button variant="ghost" size="icon" className={`text-gray-400 hover:text-white hover:bg-white/5 rounded-full hidden sm:flex ${user ? 'text-indigo-400' : ''}`}>
                  <User className="w-5 h-5" />
                </Button>
              </Link>
              
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full relative" onClick={toggleCart} aria-label="Abrir carrinho de compras">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-lg" aria-hidden="true">
                    {cartCount}
                  </span>
                )}
              </Button>

              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-400 hover:bg-white/5 rounded-full md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-20 z-40 bg-[#0a0a0b]/95 backdrop-blur-lg md:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <nav className="p-6 space-y-6" aria-label="Navegação Mobile">
              
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group"
                    >
                      <span className="text-lg font-bold text-gray-200 group-hover:text-white tracking-wide">{link.name}</span>
                      <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-indigo-500" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="h-px bg-white/10 my-4" aria-hidden="true" />

              {user ? (
                <div className="space-y-3">
                  <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 active:scale-95 transition-transform">
                      <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-lg">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-bold tracking-wide">{user.name}</p>
                        <p className="text-indigo-300 text-sm font-medium">Ver meu perfil</p>
                      </div>
                    </div>
                  </Link>

                  <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)} className="block">
                    <Button variant="outline" className="w-full h-14 border-white/10 hover:bg-white/5 text-gray-300 gap-2 rounded-xl text-lg font-bold">
                      <Package className="w-5 h-5" aria-hidden="true" />
                      Meus Pedidos
                    </Button>
                  </Link>
                </div>
              ) : (
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block">
                  <Button className="w-full h-14 bg-white text-black hover:bg-gray-200 text-lg font-bold rounded-xl flex items-center justify-center gap-2 shadow-xl">
                    <LogIn className="w-5 h-5" aria-hidden="true" />
                    Entrar / Cadastrar
                  </Button>
                </Link>
              )}

            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}