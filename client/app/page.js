
import Header from '@/components/dashboard/Header'
import Nav  from '@/components/dashboard/Nav'
import { HomeProducts } from '@/components/home/HomeProducts'
import Image from 'next/image'

export default function Home() {

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-50">
      <div className="z-10 w-full flex flex-col items-center  font-mono text-sm lg:flex font">
   
   <Nav />
   <Header />
   <HomeProducts />
      

      </div>

     

      
    </main>
  )
}
