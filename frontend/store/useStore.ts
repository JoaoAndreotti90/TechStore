import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_URL = 'https://techstore-qzd2.onrender.com'

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface User {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

interface StoreState {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  toggleCart: () => void;
  total: () => number;
  clearCart: () => void;
  
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  user: User | null;
  login: (userData: User) => void;
  logout: () => void;

  syncCartWithServer: () => Promise<void>;
  fetchCartFromServer: () => Promise<void>;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,

      syncCartWithServer: async () => {
        const { user, cart } = get();
        if (!user) return;
        
        const token = localStorage.getItem('techstore-token');
        if (!token) return;

        
        try {
          await fetch(`${API_URL}/auth/cart`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ cart })
          });
        } catch (error) {
          console.error(error);
        }
      },

      fetchCartFromServer: async () => {
        const { user, cart } = get();
        if (!user) return;

        const token = localStorage.getItem('techstore-token');
        if (!token) return;

        if (cart.length > 0) {
          await get().syncCartWithServer();
          return;
        }

        try {
          const response = await fetch(`${API_URL}/auth/cart`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (response.ok) {
            const data = await response.json();
            set({ cart: data });
          }
        } catch (error) {
          console.error(error);
        }
      },

      addToCart: (product) => {
        set((state) => {
          const existingItem = state.cart.find(item => item.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map(item => 
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              ),
              isCartOpen: true 
            };
          }
          return { 
            cart: [...state.cart, { ...product, quantity: 1 }],
            isCartOpen: true 
          };
        });
        get().syncCartWithServer();
      },

      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter(item => item.id !== id)
        }));
        get().syncCartWithServer();
      },

      decrementQuantity: (id) => {
        set((state) => ({
          cart: state.cart.map(item => 
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          ).filter(item => item.quantity > 0) 
        }));
        get().syncCartWithServer();
      },

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      total: () => get().cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      
      clearCart: () => {
        set({ cart: [] });
        get().syncCartWithServer();
      },

      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      user: null,
      login: (userData) => {
        set({ user: userData });
        get().fetchCartFromServer();
      },
      logout: () => set({ user: null, cart: [] }),
    }),
    {
      name: 'techstore-storage',
      partialize: (state) => ({ cart: state.cart, user: state.user }),
    }
  )
);