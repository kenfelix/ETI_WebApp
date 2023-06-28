import { FC } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Badge } from "@/components/ui/badge"

interface ArticleCardProps {
    image: StaticImageData
    category: String
    title: String
    content: String
}

const ArticleCard: FC<ArticleCardProps> = ({image, title, content, category}) => {
    return (
        <div className='flex flex-col flex-wrap mt-5 bg-white'>
            <div className='w-[240px] h-[400px]'>
            <Image
                src={image}
                alt="Image"
                className="object-cover w-full h-[55%] rounded-md"
            />
            <div className='px-5 pt-5'>
            <Badge className='bg-[#FE6711] font-thin'>{category}</Badge>
            </div>
            <div className='px-5 pt-4 pb-0 flex flex-col gap-3'>
                <h5 className='text-[12px] font-bold'>{title}</h5>
                <p className='text-[10px] text-[#A4A4AD]'>{content}</p>
            </div>
            </div>
        </div>
    );
};

export default ArticleCard;