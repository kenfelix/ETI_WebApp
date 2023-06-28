"use client"


import { FC } from 'react';
import { Button } from '../ui/button';
import { Smartphone } from 'lucide-react';
import MobileNavigation from './mobile-nav';
import { useRouter } from 'next/navigation';

interface RightNavigationProps {}

const RightNavigation: FC<RightNavigationProps> = () => {
    const router = useRouter()
    return (
        <div className='flex gap-3 items-center'>
            <div className='hidden sm:flex flex-row gap-1 items-center'>
                <Smartphone className='h-10 w-8 text-gray-300'/>
                <span className='leading-[2px] font-semibold text-[14px]'>+234 703 54 626</span>
            </div>
            <Button onClick={() => {router.push("/donate")}} variant={'outline'} className='rounded-full px-[30px]
             border-orange-500 border-[1.5px] text-orange-600 font-medium
             hover:bg-orange-50 hover:text-orange-600'>
                Donation</Button>

            <MobileNavigation/>
        </div>
    );
};

export default RightNavigation;