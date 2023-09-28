import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface TestimonialCardProps {
    content: string
    name: string
    src: string
}

const TestimonialCard: FC<TestimonialCardProps> = ({content, name, src}) => {
    return (
        <div className='flex flex-col px-6 py-8 bg-white w-[240px] h-[250px] 
        rounded-md border border-black gap-8'>
            <p className='text-[12px] font-sans text-justify overflow-y-auto max-h-[150px] pr-2'>{content}</p>
            <div className='flex gap-6 items-center'>
                <Avatar className='scale-125'>
                    <AvatarImage src={src} alt="@shadcn" />
                    <AvatarFallback>AVT</AvatarFallback>
                </Avatar>
                <p className='text-[14px] leading-4 font-serif font-bold'>{name}</p>
            </div>
        </div>
    );
};

export default TestimonialCard;