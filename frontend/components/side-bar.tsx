"use client"

import { FC } from 'react';
import Logo from './sub/logo';
import { AdminPages } from '@/constants/constant';
import Link  from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

interface SideBarProps {}

const SideBar: FC<SideBarProps> = () => {
    const path = usePathname()
    return (
        <div className='flex flex-col bg-[#202162] w-full h-screen rounded-sm py-6
            items-center'>
            <Logo/>
            <div className='w-[80%] max-w-full flex flex-col gap-[20px] mt-[50px]'>
            { AdminPages.map((page, index) => (
                <Link key={index} href={page.link} className='flex flex-col group font-medium'>
                    <Button variant={'ghost'} className={`w-full text-[16px]
                        text-white !pl-3 py-6 justify-start group-hover:bg-[#3840F7] 
                        hover:text-white ${path === page.link ? 'bg-[#3840F7]' : 'bg-none'}`}>
                        <page.icon className="mr-3 h-7 w-7" />{page.title}
                    </Button>
                </Link>
                
            )) }
            </div>
        </div>
    );
};

export default SideBar;