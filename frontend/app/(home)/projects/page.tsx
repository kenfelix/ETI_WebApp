"use client"

import ProjectCard from '@/components/sub/project-card';
import { PROJECTS } from '@/constants/constant';
import { FC } from 'react';
import Image from  "next/image" 
import BreadCrumbs from '@/components/sub/breadcrumbs';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import people from "@/public/people.jpg"
import { getPathName } from '@/lib/utils';

interface ProjectPageProps {}

const ProjectPage: FC<ProjectPageProps> = () => {
    const router = useRouter()
    let pathnames = getPathName()
    return (
        <div className='flex flex-col justify-center gap-[20px] items-center mb-[100px]'>
            <div className="relative w-full h-[500px]">
                <Image
                src={people}
                alt="Image"
                className="object-cover w-full h-full"
                />
                <div className='flex flex-col gap-[50px] text-white absolute top-0 left-0 h-full w-full justify-center items-center'>
                    <h3 className='font-extrabold shadow-sm text-[50px] leading-[50px] lg:text-[70px] lg:leading-[70px] font-sans'>PROJECTS</h3>
                    <BreadCrumbs pathnames={pathnames}/>
                    <Button onClick={() => {router.push("/donate")}} className='rounded-full px-[20px] py-[25px]
                    bg-orange-500 text-white font-medium max-w-[170px]
                    hover:bg-orange-50 hover:text-orange-600'>
                        Donation Now</Button>
                </div>
            </div>
            <div>
                <h5 className='text-[#FC7223] text-[30px] text-center font-semibold mt-[50px]'>LIFE CHANGING PROJECTS</h5>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {PROJECTS.map((project, index) => (
                    <ProjectCard key={index} image={project.image} category={project.category} title={project.title} content={project.content} raised={project.raised} goal={project.goal}/>
                ))}
            </div>
        </div>
    );
};

export default ProjectPage;