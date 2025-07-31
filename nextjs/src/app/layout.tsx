import type { Metadata } from 'next';
import Provider from './Provider';
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
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
