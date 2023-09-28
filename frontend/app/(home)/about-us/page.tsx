import CallToAction from "@/components/call-to-action";
import { FC } from "react";
import Image from "next/image"
import people from "@/public/people.jpg"
import blog from "@/public/blogpicture.jpg"
import BreadCrumbs from "@/components/sub/breadcrumbs";
import DonationNow from "@/components/sub/donate-now";
import VideoPlayer from "@/components/sub/video";
import Carousel from "@/components/sub/carousel";
import { getProjectPhotos } from "@/utils/actions";
import { About } from "@/components/sub/about-page-content";
import { getPageContent } from "@/utils/getData";
import OurStory from "@/components/content/our-story";
import Arms from "@/components/content/arms";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export type Photo = {
    imageURL: string
  }

interface AboutUsPageProps {}

const AboutUsPage: ({}: AboutUsPageProps) => Promise<JSX.Element> = async () =>  {
    const pageContent: About =  await getPageContent("about")
    const photos: Photo[] = await getProjectPhotos()
    return(
        <div className='flex flex-col gap-[60px] w-full'>
            <div className="relative w-full h-[500px]">
                <Image
                src={`http://localhost:8000/${pageContent.heroImage}`}
                width={0}
                height={0}
                unoptimized
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
                <OurStory/>
                <Link href="/about-us/leadership">
                    <Button 
                        className="text-[20px] rounded-full py-7 px-7 border-[3px] border-black 
                        hover:text-[#FC7223] hover:border-[#FC7223] hover:bg-white"
                        variant={"outline"}
                    >Meet Leadership
                    </Button>
                </Link>
            </div>
            <div className="w-full">
                <div className="w-full flex-grow md:h-[400px] bg-[#ff6308] py-[50px] px-[20px] flex flex-col md:flex-row gap-10">
                    <Image
                        src={blog}
                        alt="Image"
                        className="object-cover md:w-[400px] h-[70%]"
                    />
                    <div className="flex flex-col gap-[20px]">
                        <h3 className='font-sans font-black text-[30px] text-white capitalize'>
                            PARTNER WITH OUR GROWING INITIATIVE
                        </h3>
                        <p className='font-sans font-normal text-[20px] text-white capitalize mb-4'>
                            Hunger Hurts the World. <br/>
                            Help us Alleviate Poverty. <br/>
                            Assist us in Building Generational Leaders. <br/>
                        </p>
                        <DonationNow variant={"outline"} className="!bg-[#ff6308] hover:text-white"/>
                    </div>
                </div>
                <VideoPlayer id={pageContent.youtubeId}/>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 px-3">
                <h5 className='text-[#FC7223] text-[10px] font-semibold'>ARMS OF ETI</h5>
                <Arms/>                
            </div>
            <div className="flex flex-col items-center justify-center gap-4 px-3">
                <h5 className='text-[#FC7223] text-[10px] font-semibold'>PROJECT PHOTOBOOK</h5>
                {photos.length > 0 ? (<Carousel photos={photos}/>) : null}
            </div>
            <CallToAction/>
            <div></div>
            <div></div>
        </div>
    )
}
export default AboutUsPage