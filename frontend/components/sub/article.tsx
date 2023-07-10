"use client"

import { FC } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation';


type Article = {
    id: number;
    slug: string;
    title: string;
    category: string;
    content: string;
    image: StaticImageData;
  };


interface ArticleCardProps {
    news: Article
}

const ArticleCard: FC<ArticleCardProps> = ({news}) => {
    const router = useRouter()
    return (
        <div className='flex flex-col flex-wrap mt-5 bg-white cursor-pointer' onClick={()=>{router.push(`/blog/${news.slug}`)}}>
            <div className='w-[240px] h-[400px]'>
            <Image
                src={news.image}
                alt="Image"
                className="object-cover w-full h-[55%] rounded-md"
            />
            <div className='px-5 pt-5'>
            <Badge className='bg-[#FE6711] font-thin'>{news.category}</Badge>
            </div>
            <div className='px-5 pt-4 pb-0 flex flex-col gap-3'>
                <h5 className='text-[12px] font-bold'>{news.title}</h5>
                <p className='text-[10px] text-[#A4A4AD] truncate'>{news.content}</p>
            </div>
            </div>
        </div>
    );
};

export default ArticleCard;