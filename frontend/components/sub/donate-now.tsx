"use client"

import { FC } from 'react';
import { Button, ButtonProps } from '../ui/button';
import { useRouter } from 'next/navigation';

interface DonationNowProps extends ButtonProps {}

const DonationNow: FC<DonationNowProps> = ({className, ...props}) => {
    const router = useRouter()
    return (
        <Button {...props} onClick={() => {router.push("/donate")}} className={`rounded-full px-[20px] py-[25px]
            bg-orange-500 text-white font-medium max-w-[170px]
            hover:bg-orange-50 hover:text-orange-600  ${className}`}>
                Donation Now</Button>
    );
};

export default DonationNow;