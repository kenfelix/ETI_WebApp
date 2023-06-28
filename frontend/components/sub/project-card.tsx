"use client"

import Image, { StaticImageData } from 'next/image';
import { FC, useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface ProjectCardProps {
    image: StaticImageData
    category: String
    title: String
    content: String
    raised: number
    goal: number
}

const ProjectCard: FC<ProjectCardProps> = ({image, title, content, category, raised, goal}) => {
    const [progress, setProgress] = useState(0)
 
    useEffect(() => {
        const timer = setTimeout(() => setProgress((raised/goal) * 100), 500)
        return () => clearTimeout(timer)
    }, [])
    return (
        <div className='flex flex-col flex-wrap mt-5 bg-white shadow-md'>
            <div className='w-[240px] h-[450px] relative'>
                <Image
                    src={image}
                    alt="Image"
                    className="object-cover w-full h-[55%] rounded-md"
                />
                <div className='px-5 pt-5'>
                <Badge className='bg-[#009BA5] font-thin absolute top-[235px]'>{category}</Badge>
                </div>
                <div className='px-5 pt-2 pb-0 flex flex-col gap-4'>
                    <h5 className='text-[12px] font-bold'>{title}</h5>
                    <p className='text-[10px] text-[#A4A4AD]'>{content}</p>
                    <Progress  value={progress} className="w-full" />
                    <div className='flex w-full items-center justify-between text-[9px]'>
                        <p className='text-[#FE6711]'>Raised: ${raised}</p>
                        <p className='text-[#009BA5]'>Goal: ${goal}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;