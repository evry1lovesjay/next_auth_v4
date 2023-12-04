import { Inter } from 'next/font/google'
import './globals.css'
import Provider from '@/context/provider'
import Header from '@/components/Global/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Header />  
          <main style={{margin: "50px"}}>
            {children}
          </main>
        </Provider>
        </body>
    </html>
  )
}
