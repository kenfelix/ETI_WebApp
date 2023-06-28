import { FC } from 'react';
import TestimonialCard from './sub/testimonial-card';
import { TESTIMONIALS } from '@/constants/constant';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import React from 'react';

interface TestimonialsProps {}

const Testimonials: FC<TestimonialsProps> = () => {
    return (
        <div className='bg-[#FAF7F5] pt-[40px] pb-[150px] relative'>
            <div className='flex flex-col items-center justify-center gap-3'>
                <h5 className='text-[#FC7223] text-[10px] font-semibold'>TESTIMONIAL</h5>
                <h3 className='font-serif font-bold text-[30px] max-w-[400px] text-center'>What People Say About ETI</h3>
                <div className='flex flex-col md:flex-row gap-4 mt-4'>
                    {TESTIMONIALS.map((testimonial, index) => (
                        <TestimonialCard key={index} content={testimonial.content} name={testimonial.name} type={testimonial.type} />
                    ))}
                    
                </div>
                <div className='flex flex-col md:flex-row items-center justify-center gap-6 mt-11 w-full left-24'>
                    <Dialog>
                        <DialogTrigger>
                            <Button variant="outline" className='border-[#FC7223] rounded-full border-[1.5px]
                                px-[30px] hover:bg-[#fbdac7] text-[12px] font-sans font-bold'>
                                    All Testimonial
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] md:max-w-[800px] bottom-0 md:bottom-[50%]">
                        <ScrollArea className="h-72 w-48 rounded-md border">
                            <div className="p-4">
                                <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                                {/* {tags.map((tag) => (
                                <React.Fragment>
                                    <div className="text-sm" key={tag}>
                                    {tag}
                                    </div>
                                    <Separator className="my-2" />
                                </React.Fragment>
                                ))} */}
                            </div>
                        </ScrollArea>
                        </DialogContent>
                    </Dialog>
                    <p className='font-sans font-semibold text-[25px]'>200+ Trustees</p>
                </div>
            </div>
            <div className='flex flex-row justify-center items-center gap-4 md:gap-8 
            absolute inset-1 transform -translate-x-1 -translate-y-1 top-[1250px] md:top-[700px] scale-75 md:scale-100'>
                <div className='bg-[#F3EADE] w-[200px] h-[120px]
                rounded-md p-[20px]'>
                    <p className='font-serif font-bold text-[35px] items-baseline'>100<span className='text-[15px]'>+</span></p>
                    <p className='font-sans font-semibold text-[11px]'>INCREDIBLE VOLUNTEERS</p>
                </div>
                <div className='bg-[#E8F9F3] w-[200px] h-[120px]
                rounded-md p-[20px]'>
                    <p className='font-serif font-bold text-[35px] items-baseline'>100<span className='text-[15px]'>+</span></p>
                    <p className='font-sans font-semibold text-[11px]'>SUCCESSFUL CAMPAINS</p>
                </div>
                <div className='bg-[#FFFEF2] w-[200px] h-[120px]
                rounded-md p-[20px]'>
                    <p className='font-serif font-bold text-[35px] items-baseline'>100<span className='text-[15px]'>+</span></p>
                    <p className='font-sans font-semibold text-[11px]'>MONTHLY DONORS</p>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;