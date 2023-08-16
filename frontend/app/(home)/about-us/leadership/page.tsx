import CallToAction from '@/components/call-to-action';
import { About } from '@/components/sub/about-page-content';
import BreadCrumbs from '@/components/sub/breadcrumbs';
import DonationNow from '@/components/sub/donate-now';
import { getProjectPhotos } from '@/utils/actions';
import { getPageContent } from '@/utils/getData';
import Image from 'next/image';
import { Photo } from '../page';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


interface LeadershipProps {}

const Leadership: ({}: LeadershipProps) => Promise<JSX.Element> = async () =>  {
    const pageContent: About =  await getPageContent("about")
    const photos: Photo[] = await getProjectPhotos()
    return(
        <div className='flex flex-col gap-[60px] w-full'>
            <div className="relative w-full h-[500px]">
                <Image
                src={`http://localhost:8000/${pageContent.heroImage}`}
                width={0}
                height={0}
                unoptimized
                alt="Image"
                className="object-cover w-full h-full"
                />
                <div className='flex flex-col gap-[50px] text-white absolute top-0 left-0 h-full w-full justify-center items-center'>
                    <h3 className='font-extrabold shadow-sm text-[50px] leading-[50px] lg:text-[70px] lg:leading-[70px] font-sans'>OUR LEADERSHIP</h3>
                    <BreadCrumbs/>
                    <DonationNow/>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center w-full gap-3'>
                <h5 className='text-[30px] font-thin'>Meet the <span className='font-semibold'>team.</span></h5>
                <div className='border-[3px] border-double border-[#FC7223] w-[30%]'></div>
                <div className='grid grid-flow-col items-center w-[80%] justify-center my-[50px] gap-[50px]'>
                    <div className='w-[200px] h-[200px] flex flex-col items-center gap-2'>
                        <Avatar className='w-full h-full'>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AVT</AvatarFallback>
                        </Avatar>
                        <p className='text-center text-2xl font-mono font-bold leading-6'>ALEX <br /> OKEDO</p>
                        <p className='text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet?</p>
                    </div>
                    <div className='w-[200px] h-[200px] flex flex-col items-center gap-2'>
                        <Avatar className='w-full h-full'>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AVT</AvatarFallback>
                        </Avatar>
                        <p className='text-center text-2xl font-mono font-bold leading-6'>ALEX <br /> OKEDO</p>
                        <p className='text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet?</p>
                    </div>
                    <div className='w-[200px] h-[200px] flex flex-col items-center gap-2'>
                        <Avatar className='w-full h-full'>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AVT</AvatarFallback>
                        </Avatar>
                        <p className='text-center text-2xl font-mono font-bold leading-6'>ALEX <br /> OKEDO</p>
                        <p className='text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet?</p>
                    </div>
                </div>

            </div>
            <CallToAction/>
        </div>
    )
};

export default Leadership;