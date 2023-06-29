"use client"

import CallToAction from '@/components/call-to-action';
import { FC } from 'react';
import Image from "next/image"
import people from "@/public/people.jpg"
import BreadCrumbs from '@/components/sub/breadcrumbs';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { getPathName } from '@/lib/utils';

interface DonationPageProps {}

const DonationPage: FC<DonationPageProps> = () => {
    const router = useRouter()
    let pathnames = getPathName()
    
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
                    <BreadCrumbs pathnames={pathnames}/>
                    <Button onClick={() => {router.push("/donate")}} className='rounded-full px-[20px] py-[25px]
                    bg-orange-500 text-white font-medium max-w-[170px]
                    hover:bg-orange-50 hover:text-orange-600'>
                        Donation Now</Button>
                </div>
            </div>
            <CallToAction/>
            <div></div>
            <div></div>
        </div>
    );
};

export default DonationPage;