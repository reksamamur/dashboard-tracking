import './globals.css';
import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import Provider from "@/helper/provider";

import { Navigation } from '@/components/molecule/Navigation';
import { Header } from '@/components/molecule/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next',
  description: 'Next track',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(inter.className, 'bg-zinc-100')}>
        <Provider>
          <Navigation />
          <main className='relative sm:ml-64'>
            <Header />
            <div className='p-4 h-full'>{children}</div>
          </main>
        </Provider>
      </body>
    </html>
  );
}
