
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import Header from '@/components/Header'
import ClientProvider from '@/components/ui/ClientProvider'
import FirebaseAuthProvider from '@/components/ui/FirebaseAuthProvider'
import SubscriptionProvider from '@/components/ui/SubscriptionProvider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'saas app',
  description: 'sample poc',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientProvider>
      <html lang="en">
        <body className={inter.className}>
          <FirebaseAuthProvider>
            <SubscriptionProvider>
              <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              >
                <Header />
              {children}
              <Toaster />
              </ThemeProvider>
            </SubscriptionProvider>
          </FirebaseAuthProvider>
        </body>
      </html>
    </ClientProvider>
  )
}
