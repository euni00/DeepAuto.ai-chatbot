import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DeepAuto.ai ChatBot',
  description: 'ChatBot with DeepAuto.ai Scaleserve API',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
