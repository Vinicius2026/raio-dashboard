import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const BASE_URL = "https://thiagolima.metodovda.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "VDA – Venda Direta Automática | Thiago Lima",
    template: "%s | VDA",
  },
  description:
    "Método VDA de Thiago Lima: aprenda a vender pelo WhatsApp de forma profissional e sistemática. Acesse o treinamento completo.",
  keywords: [
    "VDA",
    "Venda Direta Automática",
    "Thiago Lima",
    "vender no WhatsApp",
    "marketing digital",
    "método de vendas",
    "afiliado",
  ],
  authors: [{ name: "Thiago Lima", url: BASE_URL }],
  creator: "Thiago Lima",
  publisher: "VDA – Venda Direta Automática",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: BASE_URL,
    siteName: "VDA – Venda Direta Automática",
    title: "VDA – Venda Direta Automática | Thiago Lima",
    description:
      "Método VDA de Thiago Lima: aprenda a vender pelo WhatsApp de forma profissional e sistemática.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VDA – Venda Direta Automática por Thiago Lima",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@thiagolimaslv",
    creator: "@thiagolimaslv",
    title: "VDA – Venda Direta Automática | Thiago Lima",
    description:
      "Método VDA: aprenda a vender pelo WhatsApp de forma sistemática.",
    images: ["/og-image.png"],
  },
  other: {
    "format-detection": "telephone=no",
    "X-UA-Compatible": "IE=edge",
    // Instagram / Telegram in-app browser compatibility
    "facebook-domain-verification": "",
    HandheldFriendly: "true",
    MobileOptimized: "width",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* In-app browser & PWA compatibility */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="VDA" />
        {/* Referrer policy to avoid stripping UTM params */}
        <meta name="referrer" content="no-referrer-when-downgrade" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Thiago Lima",
              url: BASE_URL,
              sameAs: [
                "https://instagram.com/thiagolimaslv",
                "https://youtube.com/@thiagolimaslv",
              ],
              jobTitle: "Especialista em Vendas pelo WhatsApp",
              worksFor: {
                "@type": "Organization",
                name: "VDA – Venda Direta Automática",
                url: "https://metodovda.com",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
