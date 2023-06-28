"use client"

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

interface LearnButtonProps {
    route: string
    title: String
}

const LearnButton: FC<LearnButtonProps> = ({route, title}) => {
    const router = useRouter()
    return (
        <Button onClick={() => {router.push(route)}} variant={'outline'} className='rounded-full px-[20px]
        border-black border-[1.5px] text-black font-bold
        hover:bg-orange-100 hover:border-orange-100 max-w-[70%] md:max-w-[60%] text-[10px] font-sans
         hover:opacity-100'>
            {title}
        </Button>
    );
};

export default LearnButton;