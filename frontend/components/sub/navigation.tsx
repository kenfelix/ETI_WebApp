"use client"

import { FC } from 'react';
import Link from 'next/link';
import { Pages } from '@/constants/constant';
import { usePathname} from 'next/navigation';

interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => {

    const path = usePathname()
    return (
        <nav className='hidden lg:ml-[170px] xl:ml-[200px] lg:flex gap-[30px]'>
            { Pages.map((page, index) => (
                <Link key={index} href={page.link} className='flex flex-col group font-medium'> 
                    {page.title} 
                    <span className={`h-[1.9px] bg-orange-400
                    group-hover:w-full transition-[width] ease duration-300
                    ${path === page.link ? 'w-full' : 'w-0'}`}>  
                        &nbsp;</span>
                </Link>
            )) }
        </nav>
    );
};

export default Navigation;