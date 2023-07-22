import { PROJECTS } from '@/constants/constant';
import ProjectCard from './sub/project-card';
import LearnButton from './sub/learn-button';
import { Project, getProjects } from '@/utils/getData';

interface ProjectProps {}

const Project: ({}: ProjectProps) => Promise<JSX.Element> = async ({}) => {
    const projects: Project[] = await getProjects()
    return (
        <div className='pt-[40px] pb-[100px]'>
            <div className='flex flex-col items-center justify-center gap-6'>
                <h5 className='text-[#FC7223] text-[10px] font-semibold'>LIFE CHANGING PROJECTS</h5>
                <h3 className='font-serif font-bold text-[30px] max-w-[400px] text-center'>Introducing Our Featured Non profit Projects</h3>
                <div className='flex flex-col md:flex-row gap-4'>
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project}/>
                    ))}
                    
                </div>
                <div  className='flex justify-center w-full items-center'>
                    <LearnButton route='/projects' title="Show More Projects"/>
                </div>
            </div>
        </div>
    );
};

export default Project;