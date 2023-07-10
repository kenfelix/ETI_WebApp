import CallToAction from '@/components/call-to-action';
import { FC } from 'react';
import Image from "next/image"
import people from "@/public/people.jpg"
import BreadCrumbs from '@/components/sub/breadcrumbs';
import DonationNow from '@/components/sub/donate-now';

interface DonationPageProps {}

const DonationPage: FC<DonationPageProps> = () => {
    
    return (
        <div className='flex flex-col gap-[80px]'>
            <div className="relative w-full h-[500px]">
                <Image
                src={people}
                alt="Image"
                className="object-cover w-full h-full"
                />
                <div className='flex flex-col gap-[50px] text-white absolute top-0 left-0 h-full w-full 
                justify-center items-center'>
                    <h3 className='font-extrabold shadow-sm text-[50px] leading-[50px] lg:text-[70px]
                     lg:leading-[70px] font-sans'>DONATE NOW</h3>
                    <BreadCrumbs/>
                    <DonationNow/>
                </div>
            </div>
            <CallToAction/>
            <div></div>
            <div></div>
        </div>
    );
};

export default DonationPage;