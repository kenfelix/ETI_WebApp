import CallToAction from '@/components/call-to-action'
import FAQs from '@/components/faqs'
import Hero from '@/components/hero'
import Intoduction from '@/components/intro'
import NewsUpdate from '@/components/news'
import Project from '@/components/projects'
import Testimonials from '@/components/testimonials'

export default function Home() {
  return (
   
      <div className='flex flex-col gap-9'>
        <Hero/>
        <Intoduction/>
        <FAQs/>
        <Project/>
        <Testimonials/>
        <CallToAction/>
        <NewsUpdate/>
      </div>
    
  )
}
