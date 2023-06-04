import Header from '@/components/header'
import '../globals.css'
import { Inter, Lato } from 'next/font/google'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })
const font = Lato({
  subsets: ["latin"],
  weight: '400'
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${font.className} h-screen w-full`}>
        <div>
          <Header/>
          {children}
          <Footer/>
        </div>
      </body>
    </html>
  )
}
