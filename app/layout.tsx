import type { Metadata, Viewport } from "next";
import "./globals.css";
import { businessConfig } from "@/lib/config/business";

export const metadata: Metadata = {
  metadataBase: new URL("https://chezmelovesalon.co.za"),

  title: {
    default: "CHEZ MELOVE | Beauty & Hair Salon in Long Street, Cape Town",
    template: "%s | CHEZ MELOVE",
  },

  description:
    "Discover CHEZ MELOVE, a premium beauty and hair destination at 128 Long Street, Cape Town City Centre.",

  applicationName: "CHEZ MELOVE",

  keywords: [
    "CHEZ MELOVE",
    "beauty salon Cape Town",
    "beauty salon Long Street",
    "hair salon Cape Town",
    "hair salon Long Street",
    "beauty Long Street",
    "salon Cape Town",
  ],

  authors: [
    {
      name: "CHEZ MELOVE",
    },
  ],

  creator: "CHEZ MELOVE",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "/",
    siteName: "CHEZ MELOVE",
    title: "CHEZ MELOVE | Beauty & Hair Salon in Long Street, Cape Town",
    description:
      "A premium beauty and hair destination in the heart of Long Street, Cape Town.",
  },

  twitter: {
    card: "summary_large_image",
    title: "CHEZ MELOVE | Beauty & Hair Salon in Long Street, Cape Town",
    description:
      "A premium beauty and hair destination in the heart of Long Street, Cape Town.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#11100E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA">
      <body>
        <div
          data-site="chez-melove"
          data-business={businessConfig.name}
          className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]"
        >
          {children}
        </div>
      </body>
    </html>
  );
}