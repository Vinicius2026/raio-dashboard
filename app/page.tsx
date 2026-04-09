import dynamic from 'next/dynamic';
import Header from "@/components/Header";
import Hero from "@/components/Hero";

// Lazy load do Footer com SSR desabilitado para melhor performance
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-32 bg-transparent" />,
  ssr: false
});

export default function Home() {
  return (
    <main className="min-h-screen app-bg">
      <Header />
      <Hero />
      <Footer />
    </main>
  );
}
