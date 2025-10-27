import localFont from "next/font/local";
import "./globals.css";
import NextAuSessionProvider from "@/provider/NextAuSessionProvider";
import { ProvidersChakra } from "@/provider/ChakraProviders";
import { ColorModeScript } from "@chakra-ui/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ColorModeScript initialColorMode="light" />
        <NextAuSessionProvider>
          <ProvidersChakra>{children}</ProvidersChakra>
        </NextAuSessionProvider>
      </body>
    </html>
  );
}
