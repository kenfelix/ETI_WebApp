import CallToAction from '@/components/call-to-action';
import Image from "next/image"
import people from "@/public/people.jpg"
import BreadCrumbs from '@/components/sub/breadcrumbs';
import DonateCard from '@/components/sub/donate-card';
import Carousel from '@/components/sub/carousel';
import { Photo } from '../about-us/page';
import { getProjectPhotos } from '@/utils/actions';

interface DonationPageProps {}

const DonationPage: ({}: DonationPageProps) => Promise<JSX.Element> = async () =>  {
    const photos: Photo[] = await getProjectPhotos()
    return (
        <div className='flex flex-col gap-[80px]'>
            <div className="relative w-full h-[500px] md:h-[600px]">
                <Image
                src={people}
                alt="Image"
                className="object-cover w-full h-full"
                />
                <div className='flex flex-col gap-[50px] text-white absolute top-[200px] h-full w-full 
                justify-center items-center'>
                    <h3 className='font-extrabold shadow-sm text-[50px] leading-[50px] lg:text-[70px]
                     lg:leading-[70px] font-sans text-center'>DONATIONS</h3>
                    <BreadCrumbs/>
                    <DonateCard className='z-50'/>
                </div>
            </div>
            <div className='hidden md:block'>
            {photos.length > 0 ? (<Carousel photos={photos}/>) : null}
            </div>
            <CallToAction className='mt-[250px] md:mt-0'/>
            <div></div>
        </div>
    );
};

export default DonationPage;