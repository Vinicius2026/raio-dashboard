import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscrição Confirmada | VDA",
  description: "Obrigado por adquirir a VDA – Venda Direta Automática.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Inscrição Confirmada | VDA",
    description: "Obrigado por adquirir a VDA.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "VDA Oficial" }],
  },
};

export default function ObrigadoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
