import type { Metadata } from "next";
import AulasMeteoricoPage from "@/components/AulasMeteoricoPage";

export const metadata: Metadata = {
  title: "Aulas Meteórico — VDA Gratuito",
  description:
    "Entre gratuitamente nas aulas do método Meteórico da VDA. Aprenda a vender pelo WhatsApp com Thiago Lima.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Aulas Meteórico — VDA Gratuito",
    description: "Entre gratuitamente nas aulas do método Meteórico da VDA.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "VDA Gratuito" }],
  },
};

export default function Page() {
  return <AulasMeteoricoPage />;
}
