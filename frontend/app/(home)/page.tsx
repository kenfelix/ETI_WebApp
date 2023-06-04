import Hero from '@/components/hero'
import Intoduction from '@/components/intro'
import Image from 'next/image'

export default function Home() {
  return (
   
      <div className='flex flex-col'>
        <Hero/>
        <Intoduction/>
        
      </div>
    
  )
}
