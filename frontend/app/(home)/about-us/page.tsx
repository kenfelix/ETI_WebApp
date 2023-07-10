import CallToAction from "@/components/call-to-action";
import { FC } from "react";
import Image from "next/image"
import people from "@/public/people.jpg"
import BreadCrumbs from "@/components/sub/breadcrumbs";
import DonationNow from "@/components/sub/donate-now";

interface AboutUsPageProps {}

const AboutUsPage: FC<AboutUsPageProps> = () => {
    return(
        <div className='flex flex-col gap-[60px] w-full'>
            <div className="relative w-full h-[500px]">
                <Image
                src={people}
                alt="Image"
                className="object-cover w-full h-full"
                />
                <div className='flex flex-col gap-[50px] text-white absolute top-0 left-0 h-full w-full justify-center items-center'>
                    <h3 className='font-extrabold shadow-sm text-[50px] leading-[50px] lg:text-[70px] lg:leading-[70px] font-sans'>ABOUT US</h3>
                    <BreadCrumbs/>
                    <DonationNow/>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 px-3">
                <h5 className='text-[#FC7223] text-[10px] font-semibold'>OUR STORY</h5>
                <h3 className='font-serif font-bold text-[30px] max-w-[400px] text-center'>About Eternal Treasures Empowerment Initiative</h3>
                <p className='text-[16px] font-sans font-semibold max-w-2xl text-center'>
                The Eternal Treasures Empowerment Initiative (ETI) is a not-for-profit and 
                non-political Christian organisation with a mandate to be a voice for the voiceless. 
                ETI was founded in 2011 by Alex Onyebuchi Okedo. She began her philanthropic activities in 2011 as 
                the Feed A Soul Project (FAS-P) 
                but has now grown and expanded to become ETI.  to reach the world with the love of Jesus Christ 
                </p>
                <div></div>
                <div></div>
                <div></div>
                <h3 className='font-serif font-bold text-[30px] max-w-[400px] text-center'>Mission And Purpose</h3>
                <p className='text-[16px] font-sans font-semibold max-w-2xl text-center'>
                Matt 25:35-36: For I was hungry and you gave me something to eat, I was 
                thirsty and you gave me something to drink, I was a stranger and you 
                invited me in; I needed clothes and you clothed me, I was sick and you looked after me, 
                I was in prison and you came to visit me.
                </p>
                <p className='text-[16px] font-sans font-semibold max-w-2xl text-center'>
                In line with the above scripture, the ETI hopes to reach the world with the 
                love of Jesus Christ by ministering to the basic welfare needs of the vulnerable 
                and less privileged in society such as the widowed, children in orphanages/ motherless babies’ 
                homes, the elderly, homeless, indigent students and the unemployed homes. Food items, clothing,
                 accommodation, healthcare, small-scale businesses/ skill acquisition programs and school fees 
                 will be provided through. Whilst ministering to the physical, psychosocial, educational, 
                and economic needs of these ones, they will also be blessed with the Gospel of our Lord Jesus Christ.
                </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 px-3">
                <h5 className='text-[#FC7223] text-[10px] font-semibold'>ARMS OF ETI</h5>
                <h3 className='font-serif font-bold text-[30px] max-w-[400px] text-center'>Feed a Soul Project <br /> (FAS-P)</h3>

                <h3 className='font-serif font-bold text-[30px] max-w-[400px] text-center'>Academic, Career, Entrepreneurial Training (ACET)</h3>

                <h3 className='font-serif font-bold text-[30px] max-w-[400px] text-center'>Excel Power</h3>
                
            </div>
            <CallToAction/>
            <div></div>
            <div></div>
        </div>
    )
}
export default AboutUsPage