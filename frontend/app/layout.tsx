import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/landing/Navbar"; 
import Footer from "@/components/landing/Footer"; 
import CartSidebar from "@/components/cart/CartSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechStore | O Futuro da Tecnologia",
  description: "Sua loja de eletrônicos premium. Encontre os melhores lançamentos, ofertas e equipamentos de alta performance com segurança.",
  keywords: ["tecnologia", "eletrônicos", "comprar pc", "notebooks", "techstore", "ecommerce"],
  openGraph: {
    title: "TechStore | O Futuro da Tecnologia",
    description: "Equipamentos premium para quem respira inovação.",
    type: "website",
    locale: "pt_BR",
    siteName: "TechStore",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body 
        suppressHydrationWarning 
        className={`${inter.className} antialiased bg-[#0a0a0b] text-white selection:bg-indigo-500/30 flex flex-col min-h-screen`}
      >
        <Navbar />
        
        <div className="flex-1">
          {children}
        </div>

        <Footer />
        <CartSidebar />
        
      </body>
    </html>
  );
}