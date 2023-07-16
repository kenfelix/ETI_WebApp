import '@/app/globals.css'
import SideBar from '@/components/side-bar'
import { Toaster } from '@/components/ui/toaster'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen w-screen overflow-x-hidden`} >
        <div className='w-full h-full flex flex-row'>
          <div className='w-[20%] fixed z-50 overflow-x-hidden'>
            <SideBar/>
          </div>
          <div className='w-[80%] ml-[20%]'>
           {children}
           <Toaster />
          </div>
        </div>
        </body>
    </html>
  )
}
