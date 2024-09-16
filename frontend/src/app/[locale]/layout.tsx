import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GPI 360",
  description: "Aplicación para gestionar stock y  emitir facturas de AFIP",
};

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default async function RootLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = params;
  const messages = await getMessages(locale as any);

  return (
    <html lang={locale}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <div className="flex flex-col min-h-screen container">
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
