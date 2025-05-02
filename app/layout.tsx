import type { Metadata, Viewport } from 'next';
import { Nunito, Kodchasan } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { cn } from '@/lib/utils';

const nunito = Nunito({ 
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-nunito'
});

const kodchasan = Kodchasan({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-kodchasan'
});

export const metadata: Metadata = {
  title: 'Strive AI Chatbot',
  description: 'AI-powered assistant for career guidance and wellbeing support',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(
      nunito.variable,
      kodchasan.variable,
    )}>
      <body className={cn(
        'min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 font-sans antialiased',
        nunito.className
      )} suppressHydrationWarning>
        <ThemeProvider defaultTheme="system" storageKey="strive-theme">
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
