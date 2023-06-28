"use client"

import { FC } from 'react';
import manhand from '../public/man-hand.jpg'
import Image from 'next/image';
import { Mic2 } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import partner from '../public/partner1.jpg'


interface IntoductionProps {}

const Intoduction: FC<IntoductionProps> = () => {

    const router = useRouter()
    return (
        <div className='flex flex-col p-10 lg:p-0 justify-center items-center gap-[100px]'>
            {/* main */}
            <div className='lg:h-screen flex flex-col-reverse md:flex-row items-center justify-center 
             gap-[100px] md:gap-[10px] lg:gap-[200px]'>
                {/* left */}

                <div className=' relative w-full'>
                    <div className='border-[1.5px] border-[#EEDAD0] w-[200px] h-[300px] lg:w-[300px] lg:h-[400px]'>
                        <div className=' absolute left-7 top-6'>
                            <Image
                            src={manhand}
                            alt="Image"
                            className="object-cover rounded-md w-[200px] h-[250px] lg:w-[300px] lg:h-[350px]"
                            />
                        </div>
                        <div className='bg-white absolute w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] left-[150px] -top-[60px] items-center flex justify-center'>
                            <Image
                                src={manhand}
                                alt="Image"
                                className="object-cover w-[80px] h-[80px] lg:w-[180px] lg:h-[180px]"
                            />
                        </div>
                        <div className="absolute left-[120px] top-[220px] lg:top-[320px] w-[140px] lg:w-[240px] p-5 lg:p-10 bg-[#FE6711]">
                            <div className='text-white font-bold text-2xl leading-[20px] lg:text-4xl lg:leading-[20px]'>150k 
                            <br /><span className='text-sm leading-[10px] font-light'>
                                Volunteers helping carry out our global mission</span></div>
                        </div>
                        <div className="absolute left-[220px] lg:left-[350px] top-[230px] lg:top-[330px] w-[30px] lg:w-[90px] p-5 bg-white">
                        </div>
                    </div>
                </div>

                {/* right */}

                <div className='flex flex-col lg:max-w-xs gap-5'>
                    <h2 className='font-serif font-extrabold text-[20px] lg:text-[32px]'>How we're making a difference</h2>
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
                        border-black border-[1.5px] text-black font-medium text-[10px] lg:text-[15px]
                        hover:bg-orange-100 hover:border-orange-100 max-w-[50%] hover:opacity-100'>
                        Learn More</Button>
                </div>
            </div>

            {/* patners */}
            <div className='grid grid-cols-2 md:grid-cols-4 bg-[#009BA5] gap-[40px] p-4 rounded-md'>
                <Image
                    src={partner}
                    alt="Image"
                    className="object-cover rounded-md w-[120px] h-[100px]"
                />
                <Image
                    src={partner}
                    alt="Image"
                    className="object-cover rounded-md w-[120px] h-[100px]"
                />
                <Image
                    src={partner}
                    alt="Image"
                    className="object-cover rounded-md w-[120px] h-[100px]"
                />
                <Image
                    src={partner}
                    alt="Image"
                    className="object-cover rounded-md w-[120px] h-[100px]"
                />
            </div>
        </div>
    );
};

export default Intoduction;