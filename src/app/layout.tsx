import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { site, product } from "@/config/site";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Figtree({ subsets: ["latin"], variable: "--font-body", display: "swap" });

const title = `Brosse à vapeur chien et chat rechargeable USB | ${site.brand}`;
const description =
  "Brosse à vapeur pour chien et chat : réservoir d'eau intégré, recharge USB, poignée ergonomique. Aide à retirer les poils détachés. Produit neuf.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.brand}` },
  description,
  keywords: ["brosse vapeur chien", "brosse vapeur chat", "brosse toilettage chien", "brosse toilettage chat", "brosse anti poils", "brosse rechargeable chien", "brosse pour animaux"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: site.locale, url: "/", siteName: site.brand, title, description, images: [{ url: product.images[0].src, alt: product.images[0].alt }] },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#0E2A33", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body>{children}<Analytics /></body>
    </html>
  );
}
