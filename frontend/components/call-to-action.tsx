import { FC, HtmlHTMLAttributes } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import blogImage from '../public/blogpicture.jpg'
import Image from 'next/image';

interface CallToActionProps extends HtmlHTMLAttributes<HTMLDivElement> {}

const CallToAction: FC<CallToActionProps> = ({...props}) => {
    return (
        <div {...props}>
            <div className='flex flex-row gap-[90px] md:pt-[40px] md:pb-[80px] px-5 md:mt-[100px] items-center justify-center md:justify-end scale-[.8] md:scale-100'>
                <div className='flex flex-col gap-[15px] max-w-[400px]'>
                    <h5 className='text-[#FC7223] text-[10px] font-semibold'>CALL TO ACTION</h5>
                    <h3 className='font-extrabold font-serif text-[30px]'>Let&apos;s Create Something Great Together!</h3>
                    <div className='flex flex-col gap-5 mt-7'>
                        <div className='flex gap-3'>
                            <Input type="text" id="firstname" placeholder="First Name" />
                            <Input type="text" id="lastname" placeholder="Last Name" className='bg-[#FEF7F4]'/>
                        </div>
                        <Textarea
                        placeholder="Message"
                        className="resize-none bg-[#FEF7F4]"
                        />
                        <Button type="submit" className='rounded-full px-[20px] py-[15px]
                    bg-orange-500 text-white font-normal max-w-[100px]
                    hover:bg-orange-50 hover:text-orange-600 text-[12px]'>SEND</Button>
                    </div>
                </div>
                <div className="hidden md:block w-[550px] h-[400px]">
                    <Image
                        src={blogImage}
                        alt="Image"
                        className="object-cover rounded-md w-full h-full"
                    />
                </div>

            </div>
        </div>
    );
};

export default CallToAction;