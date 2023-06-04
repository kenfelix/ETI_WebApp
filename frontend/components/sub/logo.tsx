"use client"

import { FC } from 'react';
import Link from 'next/link'
import { motion } from "framer-motion"

interface LogoProps {}

const MotionLink = motion(Link)

const Logo: FC<LogoProps> = () => {
    return (
        <div className='flex items-center justify-center'>
            <MotionLink href={'/'} className='w-12 h-12 bg-black text-white flex items-center justify-center rounded-full text-xl font-bold'
                whileHover={{scale:1.2}}>
                ETI
            </MotionLink>
        </div>
    );
};

export default Logo;