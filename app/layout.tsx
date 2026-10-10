import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";

import ScrollProvider from "@/components/providers/ScrollProvider";
import PageTransitionProvider from "@/components/providers/PageTransitionProvider";
import BookingDialogProvider from "@/components/providers/BookingDialogProvider";

import HeaderMatrix from "@/components/navigation/HeaderMatrix";
import FooterMatrix from "@/components/navigation/FooterMatrix";
import WhatsAppButton from "@/components/navigation/WhatsAppButton";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Chez Melove | Premium Unisex Salon Cape Town",
  description:
    "Experience world-class editorial hair styling, aesthetics, and premium wellness at Cape Town's premier luxury unisex salon. Book online instantly.",
  keywords: [
    "Unisex Salon Cape Town",
    "Chez Melove",
    "Premium Hair Salon Cape Town",
    "Luxury Beauty Spa Cape Town",
  ],
  alternates: {
    canonical: "https://melove.co.za",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className="antialiased selection:bg-neutral-900 selection:text-white"
    >
      <body className="min-h-screen overflow-x-hidden bg-neutral-50 text-neutral-900">
        <BookingDialogProvider>
          <Suspense fallback={null}>
            <ScrollProvider>
              <PageTransitionProvider>
                <HeaderMatrix />

                <main className="relative min-h-screen w-full md:pt-[80px]">
                  {children}
                </main>

                <WhatsAppButton />
                <FooterMatrix />
              </PageTransitionProvider>
            </ScrollProvider>
          </Suspense>
        </BookingDialogProvider>
      </body>
    </html>
  );
}