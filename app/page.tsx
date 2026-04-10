import dynamic from 'next/dynamic';
import Header from "@/components/Header";
import Hero from "@/components/Hero";

// Lazy load sections below the fold
const AboutSection = dynamic(() => import("@/components/AboutSection"), {
  loading: () => <div className="h-64 bg-transparent" />,
  ssr: true,
});

const GraduationSection = dynamic(() => import("@/components/GraduationSection"), {
  loading: () => <div className="h-64 bg-transparent" />,
  ssr: true,
});

const ContactForm = dynamic(() => import("@/components/ContactForm"), {
  loading: () => <div className="h-64 bg-transparent" />,
  ssr: false,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-32 bg-transparent" />,
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen app-bg">
      <Header />
      <Hero />
      <GraduationSection />
      <AboutSection />
      <ContactForm />
      <Footer />
    </main>
  );
}
