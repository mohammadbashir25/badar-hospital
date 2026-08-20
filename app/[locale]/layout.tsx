import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Noto_Sans_Arabic } from "next/font/google";

import { routing } from "../../i18n/routing";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),

  title: {
    default: "Badar Medical Hospital | بدر طبي روغتون",
    template: "%s | Badar Medical Hospital",
  },

  description:
    "Badar Medical Hospital provides trusted, professional, and compassionate healthcare services with modern medical facilities and experienced healthcare professionals.",

  keywords: [
    "Badar Medical Hospital",
    "Badar Hospital",
    "بدر طبی روغتون",
    "شفاخانه بدر",
    "Medical Hospital",
    "Hospital in Afghanistan",
    "Healthcare Afghanistan",
    "Medical Services Afghanistan",
  ],

  authors: [
    {
      name: "Badar Medical Hospital",
    },
  ],

  creator: "Badar Medical Hospital",
  publisher: "Badar Medical Hospital",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fa_AF", "ps_AF"],
    siteName: "Badar Medical Hospital",
    title: "Badar Medical Hospital | Trusted Healthcare",
    description:
      "Professional and compassionate healthcare services at Badar Medical Hospital.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Badar Medical Hospital",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Badar Medical Hospital",
    description:
      "Professional and compassionate healthcare services at Badar Medical Hospital.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "healthcare",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  const direction = locale === "en" ? "ltr" : "rtl";

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${inter.variable} ${notoSansArabic.variable} h-full antialiased bg-background`}
    >
      <body className="min-h-full flex flex-col bg-background">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}