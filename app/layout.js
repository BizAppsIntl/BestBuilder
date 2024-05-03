import { Roboto } from "next/font/google";
import { Inter } from 'next/font/google'
// import "tw-elements-react/dist/css/tw-elements-react.min.css";
import './globals.css'


import TopNav from '@/app/components/Nav/TopNav'
import ToastContainerWrapper from "@/app/components/ToastContainerWrapper";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Best Builder',
  description: 'Developed by Mufakhar',
}

export default function RootLayout({ children }) {
  if (!process.env.NEXT_PUBLIC_API_URL) return null;


  return (
    <html lang="en">
      <body className={inter.className + " px-4 md:xl:px-16  min-h-screen flex flex-col  "}>
        <ToastContainerWrapper/>

        <TopNav />
        {children}

      </body>
    </html>
  )
}
