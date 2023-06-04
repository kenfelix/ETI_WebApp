"use client"

import { FC } from 'react';
import manhand from '../public/man-hand.jpg'
import Image from 'next/image';
import { Mic2 } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';


interface IntoductionProps {}

const Intoduction: FC<IntoductionProps> = () => {

    const router = useRouter()
    return (
        <div className='flex flex-col w-full justify-center items-center'>
            {/* main */}
            <div className='w-full h-screen flex flex-row items-center justify-center gap-[200px]'>
                {/* left */}

                <div className=' relative'>
                    <div className='border border-[#EEDAD0] w-[300px] h-[400px]'>
                        <div className=' absolute left-7 top-6'>
                            <Image
                            src={manhand}
                            alt="Image"
                            className="object-cover rounded-md w-[300px] h-[350px]"
                            />
                        </div>
                        <div className='bg-white absolute w-[200px] h-[200px] left-[150px] -top-[60px] items-center flex justify-center'>
                            <Image
                                src={manhand}
                                alt="Image"
                                className="object-cover w-[180px] h-[180px]"
                            />
                        </div>
                        <div className="absolute left-[150px] top-[320px] w-[240px] p-10 bg-[#FE6711]">
                            <div className='text-white font-bold text-4xl leading-[20px]'>150k <br /><span className='text-sm leading-[10px] font-light'>Volunteers helping carry out our global mission</span></div>
                        </div>
                        <div className="absolute left-[350px] top-[330px] w-[90px] p-5 bg-white">
                        </div>
                    </div>
                </div>

                {/* right */}

                <div className='flex flex-col max-w-xs gap-5'>
                    <h2 className='font-serif font-extrabold text-[32px]'>How we're making a difference</h2>
                    <p className='text-[12px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Eveniet vero minima eos natus ipsa assumenda quod voluptate, 
                        amet ducimus consequatur.</p>
                    <div className='flex w-full items-center gap-3'>
                        <Mic2 className='w-[20%] flex-grow'/>
                        <p className='w-[80%] text-[10px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, iste.</p>
                    </div>
                    <div className='flex w-full items-center gap-3'>
                        <Mic2 className='w-[20%] flex-grow'/>
                        <p className='w-[80%] text-[10px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, iste.</p>
                    </div>
                    <p className='text-[11px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Eveniet vero minima eos natus ipsa assumenda quod voluptate, 
                        amet ducimus consequatur.</p>
                        <Button onClick={() => {router.push("/donate")}} variant={'outline'} className='rounded-full px-[30px]
                        border-black border-[1.5px] text-black font-medium
                        hover:bg-orange-50 hover:border-orange-50 max-w-[50%]'>
                        Learn More</Button>
                </div>
            </div>

            {/* patners */}
            <div>
            </div>
        </div>
    );
};

export default Intoduction;