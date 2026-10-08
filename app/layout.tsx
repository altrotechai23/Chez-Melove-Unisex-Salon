import type { Metadata } from "next";
import ScrollProvider from "@/components/providers/ScrollProvider";
import HeaderMatrix from "@/components/navigation/HeaderMatrix";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Chez Melove | Premium Unisex Salon Cape Town",
  description: "Experience world-class editorial hair styling, aesthetics, and premium wellness at Cape Town's premier luxury unisex salon. Book online instantly.",
  keywords: ["Unisex Salon Cape Town", "Chez Melove", "Premium Hair Salon Cape Town", "Luxury Beauty Spa Cape Town"],
  alternates: {
    canonical: "https://melove.co.za",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased selection:bg-neutral-900 selection:text-white">
      <body className="bg-neutral-50 text-neutral-900 overflow-x-hidden min-h-screen">
        <ScrollProvider>
          <HeaderMatrix />
          <main className="relative min-h-screen w-full md:pt-[80px]">
            {children}
          </main>
        </ScrollProvider>
      </body>
    </html>
  );
}
