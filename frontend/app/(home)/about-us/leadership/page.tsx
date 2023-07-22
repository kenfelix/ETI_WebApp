import CallToAction from '@/components/call-to-action';
import { About } from '@/components/sub/about-page-content';
import BreadCrumbs from '@/components/sub/breadcrumbs';
import DonationNow from '@/components/sub/donate-now';
import { getProjectPhotos } from '@/utils/actions';
import { getPageContent } from '@/utils/getData';
import Image from 'next/image';
import { Photo } from '../page';


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
            <CallToAction/>
            <div></div>
            <div></div>
        </div>
    )
};

export default Leadership;