import dynamic from 'next/dynamic';
import HeroSection from '@/components/landing/HeroSection';
import ProductsSection from '@/components/landing/ProductsSection';
import FeaturesSection from '@/components/landing/FeaturesSection';

const TestimonialsSection = dynamic(() => import('@/components/landing/TestimonialsSection'));
const CTASection = dynamic(() => import('@/components/landing/CTASection'));

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}