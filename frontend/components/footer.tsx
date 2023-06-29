"use client"


import { FC } from 'react';
import Logo from './sub/logo';
import { footerLinks, nonProfits } from '@/constants/constant';
import { usePathname, useRouter } from 'next/navigation';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface FooterProps {}

const MotionButton = motion(Button)

const Footer: FC<FooterProps> = () => {
    const path = usePathname()
    const router = useRouter()
    return (
        <footer className='relative text-gray-50 flex-wrap bg-[#21202B] flex flex-col items-center py-10'>
            <div className='flex flex-col md:flex-row justify-between gap-5 md:gap-0 bg-[#FE6711] absolute -top-[110px] md:-top-[60px] w-[60%] p-[35px] rounded-sm'>
                <div className='flex flex-col gap-3 max-w-[400px]'>
                    <h3 className='text-[16px] font-bold'>Making Greatness Possible In Society</h3>
                    <p className='text-[10px] font-extralight leading-2'>Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Iusto nesciunt consectetur architecto, sunt alias aliquam?
                    </p>
                </div>
                <Button onClick={() => {router.push("/donate")}} className='rounded-full px-[30px]
                border-white border-[1.5px] text-white font-medium bg-transparent
                hover:bg-orange-50 hover:text-orange-600'>
                Patnership</Button>
            </div>
            <div className='flex flex-col md:grid md:grid-cols-4 w-full 
                items-center justify-center text-gray-50 text-[14px] gap-10 md:gap-[30px] lg:gap-[50px] xl:gap-[70px] px-[50px] lg:px-[100px] xl:px-[200px] pt-[120px] pb-[60px] md:py-[80px] leading-4'>
                <div className='flex flex-col items-center text-center md:text-left md:items-start gap-4 max-w-full'>
                    <Logo/>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam odio dolo</p>
                    <p>64, Mishjkd, jdoji, Nigeria 71234</p>
                </div>
                <div className='flex flex-col items-start font-medium gap-3'>
                    <h5 className='text-[16px]'>Main Menu</h5>
                    <nav className='flex flex-col'>
                        { footerLinks.map((page, index) => (
                            <a key={index} href={page.link} className={`flex leading-5 hover:text-orange-400 ${path === page.link? 'text-orange-400' : 'text-white'}`}> 
                                {page.title}
                            </a>
                        )) }
                    </nav>
                </div>
                <div className='flex flex-col items-start font-medium gap-3'>
                    <h5 className='text-[16px]'>NONPROFITS</h5>
                    <nav className='flex flex-col'>
                        { nonProfits.map((page, index) => (
                            <a key={index} href={page.link} className={`flex leading-5 hover:text-orange-400 ${path === page.link? 'text-orange-400' : 'text-white'}`}> 
                                {page.title}
                            </a>
                        )) }
                    </nav>
                </div>
                <div className='flex flex-col gap-5 items-center md:items-start'>
                    <div className='flex flex-row gap-4'>
                        <MotionButton whileHover={{y:3}} variant={'default'} className='rounded-full bg-white p-[13px] hover:bg-white'><FacebookIcon className='text-black h-4 w-4'/></MotionButton>
                        <MotionButton whileHover={{y:3}} variant={'default'} className='rounded-full bg-black p-[13px] hover:bg-black'><InstagramIcon className='text-white h-4 w-4'/></MotionButton>
                        <MotionButton whileHover={{y:3}} variant={'default'} className='rounded-full bg-black p-[13px] hover:bg-black'><TwitterIcon className='text-white h-4 w-4'/></MotionButton>
                    </div>
                    <p className='text-[13px]'>Discover more</p>
                    <MotionButton whileHover={{scale: [1.2, 1] }} variant={'default'} className='rounded-full bg-red-600 hover:bg-black '><YoutubeIcon className='text-white'/></MotionButton>
                </div>
            </div>
            <p className='font-extralight text-[9px] sm:text-[12px] lg:text-[15px]'>Copyright ©2023 Eternal Treasure Initiative. All Rights Reserved.</p>
        </footer>
        
    );
};

export default Footer;