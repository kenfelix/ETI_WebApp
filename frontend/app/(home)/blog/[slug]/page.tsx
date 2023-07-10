import Image from "next/image"
import { getBlogPost } from '@/utils/getData';
import { redirect} from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {UserCircleIcon} from "lucide-react"
import { Separator } from "@/components/ui/separator";

interface BlogDetailedPageProps {
    params: { slug: string }
}

const BlogDetailedPage: ({}: BlogDetailedPageProps) => Promise<JSX.Element> = async ({ params }) => {
    const data = await getBlogPost(params.slug)
    if (!data) {
        // Redirect to "Page Not Found" if data is null or undefined
        redirect("/not-found")
      }
    return (
        <div className='flex w-full p-10'>

            {/* left */}
            <div className='w-[70%] flex flex-col gap-[30px]'>
                <Image
                    src={data.image}
                    alt="Image"
                    className="object-cover w-full h-[400px]"
                    />

                <p className="text-[#FC7223] text-[14px] font-semibold">{data.category} |   <span>12-03-2023</span></p>
                <h3 className='font-serif font-bold text-[30px]'>{data.title}</h3>

                <ScrollArea className="h-[400px] w-full">
                        {data.content}
                </ScrollArea>

                <Separator/>
                
                <div className="flex gap-4">
                    <div className="w-[20%]">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src="" alt="AV"/>
                            <AvatarFallback><UserCircleIcon className="w-full h-full"/></AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex flex-col">
                        
                    </div>
                </div>
                
            </div>

           {/* right */}

           <div className='w-[30%]'>
                
            </div>
        </div>
    );
};

export default BlogDetailedPage;