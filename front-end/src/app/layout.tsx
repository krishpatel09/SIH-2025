import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/components/ToastProvider";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jharkhand Tourism - Discover Natural Beauty & Rich Culture",
  description: "Smart Digital Platform for Eco & Cultural Tourism in Jharkhand. Explore Netarhat, Patratu, Betla National Park, Hundru Falls, and more.",
  keywords: "Jharkhand tourism, eco-tourism, cultural tourism, tribal culture, Netarhat, Patratu, Betla National Park",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <ToastProvider />
          <ChatbotWidget />
        </AuthProvider>
      </body>
    </html>
  );
}
