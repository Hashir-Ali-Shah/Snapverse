import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from './HeroSection';
import Features from './Features';
import UserCarousel from './UserCarousel';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <Features />
        <UserCarousel />
      </main>
      <Footer />
    </>
  );
}
