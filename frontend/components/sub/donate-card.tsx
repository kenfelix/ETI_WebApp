"use client"


import { FC, HtmlHTMLAttributes, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { donationPrices } from '@/constants/constant';
import { Input } from '../ui/input';
import { ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

interface DonateCardProps extends HtmlHTMLAttributes<HTMLDivElement> {}

const DonateCard: FC<DonateCardProps> = ({...props}) => {
    const [individual, setIndividual] = useState(true)
    const [corporate, setCorporate] = useState(false)
    const [price, setPrice] = useState(0)
    const [donor, setDonor] = useState("individual")

    const handleIndividual = () => {
        setIndividual(true)
        setDonor("individual")
        setCorporate(false)
    }
    const handleCorporate = () => {
        setCorporate(true)
        setDonor("corporate")
        setIndividual(false)
    }
    useEffect(() => {
        console.log(price, donor)
    }, [price])
    return (
        <div {...props}>
            <div className='flex flex-col gap-[30px] p-[30px] bg-white'>
                <div className='h-5'></div>
                <div>
                    <h3 className='font-black text-orange-950 text-[30px] md:text-[40px] font-sans'>DONATE NOW!</h3>
                    <p className='text-orange-950'
                    >Your Donations will go a long way in providing assistance for people in need</p>
                </div>
                <div className='flex flex-row flex-grow w-full'>
                    <Button className={`text-[20px] w-[50%]  h-full focus:bg-[#FE6711]
                    ${individual ? "bg-[#FE6711] text-white" : "bg-white text-[#FE6711]"} rounded-none
                    border-2 border-[#FE6711]
                    `}
                    onClick={handleIndividual}
                    >INDIVIDUAL</Button>
                    <Button className={`text-[20px] w-[50%] h-full focus:bg-[#FE6711]
                    ${corporate ? "bg-[#FE6711] text-white" : "bg-white text-[#FE6711]"} rounded-none
                    border-2 border-[#FE6711]
                    `}
                    onClick={handleCorporate}
                    >CORPORATE</Button>
                </div>
                <div className='items-center w-full justify-center text-center font-serif'>
                    <p className={`${individual ? "" : "hidden"} text-[#FE6711]`}>Donate as an indiviual to help 
                    finance of humanitarian projects</p>
                    <p className={`${corporate ? "" : "hidden"} text-[#FE6711]`}>
                        Donate as an Organisation and help better lives</p>
                </div>
                <div className={`grid grid-cols-3 gap-4`}>
                    {donationPrices.map((price, index) => (
                        <Button variant={"outline"} key={index} 
                        className='border-[#FE6711] rounded-none text-orange-950 
                        focus-visible:bg-[#FE6711] focus:bg-[#FE6711] peer-disabled:text-white'
                        onClick={() => {setPrice(price)}}>
                            ${price}
                        </Button>
                    ))}
                </div>
                <div className='flex items-center text-orange-950 border px-2 py-1 gap-1 border-[#FE6711]'>
                    <p>$</p>
                    <Input
                    type='text'
                    onChange={(e) => {setPrice(parseInt(e.target.value))}}
                    className='border-none focus-visible:ring-0 h-[90%]'
                    />
                </div>
                <Dialog>
                    <DialogTrigger className='flex'>
                    <Button
                        className={`w-full text-white bg-[#FE6711] font-black justify-between 
                        focus:bg-[#FE6711] rounded-none`}
                    >DONATE NOW <ArrowUpRight className='w-4 h-4'/></Button>
                    </DialogTrigger>
                    <DialogContent>

                    </DialogContent>
                </Dialog>
            </div>            
        </div>
    );
};

export default DonateCard;