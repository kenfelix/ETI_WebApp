"use client"

import { FC } from 'react';
import Image from "next/image"
import people from "../public/people.jpg"

import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { PlayIcon } from 'lucide-react';


interface HeroProps {}
const Hero: FC<HeroProps> = () => {
    const router = useRouter()
     
    return (
        <div className="relative w-full h-[600px]">
                <Image
                src={people}
                alt="Image"
                className="object-cover w-full h-full"
                />
            <div className='flex flex-col gap-5 text-white absolute top-[50px] p-[20px] md:pl-[40px] lg:left-[200px] max-w-[320px] md:max-w-lg'>
                <p className='font-bold shadow-sm text-lg'>Eternal Treasures Empowerment Initiative</p>
                <h3 className='font-extrabold shadow-sm text-[44px] leading-[50px] lg:text-[70px] lg:leading-[70px] font-serif'>Empowering Lives with Eternal Love </h3>
                <Button onClick={() => {router.push("/donate")}} className='rounded-full px-[20px] py-[25px]
                bg-orange-500 text-white font-medium max-w-[170px]
                hover:bg-orange-50 hover:text-orange-600'>
                    Donation Now</Button>
            </div>
            <div className='hidden sm:flex gap-[40px] absolute bg-[#009BA5] px-[40px] py-[30px]  md:bottom-[15px] md:right-[50px] rounded-md opacity-60 max-w-[350px] items-center'>
                <Button className='bg-white rounded-full px-3 scale-[1.7]  hover:bg-white'>
                    <PlayIcon className='text-black h-4 w-4'/>
                </Button>
                <p className='text-white text-lg'>How we're making a difference</p>
            </div>
        </div>

    );
};

export default Hero;