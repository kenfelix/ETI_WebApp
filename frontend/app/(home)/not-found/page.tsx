"use client"

import { FC } from 'react';
import Image from "next/image"
import notfound from "@/public/404.jpg"

interface PageNotFoundProps {}

const PageNotFound: FC<PageNotFoundProps> = () => {
    return (
      <div className=' flex items-center justify-center py-[50px]'>
        <Image src={notfound} alt={''} className='w-[400px] h-[400px]'/>
      </div>
      
    );
};

export default PageNotFound;