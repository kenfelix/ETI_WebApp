"use client"

import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Project } from '@/utils/getData';
import { convertFromRaw } from "draft-js";
import { convertToHTML } from 'draft-convert';

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
  

interface ProjectCardProps {
    project: Project
}

const ProjectCard: FC<ProjectCardProps> = ({project}) => {
    const [progress, setProgress] = useState(0)
    const contentState = convertFromRaw(project.content)
    const html = convertToHTML(contentState)
 
    useEffect(() => {
        const timer = setTimeout(() => setProgress((project.raised/project.goal) * 100), 500)
        return () => clearTimeout(timer)
    }, [])
    return (
        <HoverCard>
            <HoverCardTrigger>
                <div className='flex flex-col flex-wrap mt-5 bg-white shadow-md'>
                    <div className='w-[240px] h-[450px] relative'>
                        <Image
                            src={`http://localhost:8000/${project.imageURL}`}
                            alt="Image"
                            className="object-cover w-full h-[55%] rounded-md"
                            width={100}
                            height={100}
                            unoptimized
                        />
                        <div className='px-5 pt-5'>
                        <Badge className='bg-[#009BA5] font-thin absolute top-[235px]'>{project.category}</Badge>
                        </div>
                        <div className='px-5 pt-2 pb-0 flex flex-col gap-4'>
                            <h5 className='text-[12px] font-bold'>{project.title}</h5>
                            <p className='text-[10px] text-[#A4A4AD]'>{project.content.blocks[0].text}</p>
                            <Progress  value={progress} className="w-full" />
                            <div className='flex w-full items-center justify-between text-[9px]'>
                                <p className='text-[#FE6711]'>Raised: ${project.raised}</p>
                                <p className='text-[#009BA5]'>Goal: ${project.goal}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </HoverCardTrigger>
            <HoverCardContent className='absolute'>
                <p dangerouslySetInnerHTML= {{__html:html}}></p>
            </HoverCardContent>
        </HoverCard>
    );
};

export default ProjectCard;