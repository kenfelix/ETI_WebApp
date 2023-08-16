"use client"


import { FC, HtmlHTMLAttributes, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { donationAmounts } from '@/constants/constant';
import { Input } from '../ui/input';
import { ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { useFlutterwave, closePaymentModal} from 'flutterwave-react-v3';
import { createDonation } from '@/utils/actions';
import { FLUTTER_WAVE_PUBLIC_KEY } from '@/config';
import { useRouter } from 'next/navigation';

interface DonateCardProps extends HtmlHTMLAttributes<HTMLDivElement> {}

const DonateCard: FC<DonateCardProps> = ({...props}) => {
    const [individual, setIndividual] = useState(true)
    const [corporate, setCorporate] = useState(false)
    const [amount, setAmount] = useState(0)
    const [donor, setDonor] = useState("individual")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone_number, setPhone_number] = useState("")

    const router = useRouter()

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
    
    const config = {
        public_key: FLUTTER_WAVE_PUBLIC_KEY !== undefined ? FLUTTER_WAVE_PUBLIC_KEY : "",
        tx_ref: Date.now().toString(),
        amount: amount,
        currency: 'USD',
        payment_options: 'card,mobilemoney,ussd,nqr,credit,mpesa',
        customer: {
        email,
        phone_number,
        name
        },
        customizations: {
        title: 'Donations',
        description: 'Donations',
        logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };
    
    let handleFlutterPayment = useFlutterwave(config);
    
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
                    <Button className={`text-[20px] w-[50%]  h-full focus:bg-[#FE6711] hover:bg-orange-400
                    ${individual ? "bg-[#FE6711] text-white" : "bg-white text-[#FE6711]"} rounded-none
                    border-2 border-[#FE6711]
                    `}
                    onClick={handleIndividual}
                    >INDIVIDUAL</Button>
                    <Button className={`text-[20px] w-[50%] h-full focus:bg-[#FE6711] hover:bg-orange-400
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
                    {donationAmounts.map((amount, index) => (
                        <Button variant={"outline"} key={index} 
                        className='border-[#FE6711] rounded-none text-orange-950 
                        focus-visible:bg-[#FE6711] focus:bg-[#FE6711]'
                        onClick={() => {setAmount(amount)}}>
                            ${amount}
                        </Button>
                    ))}
                </div>
                <div className='flex items-center text-orange-950 border px-2 py-1 gap-1 border-[#FE6711]'>
                    <p>$</p>
                    <Input
                    type='text'
                    onChange={(e) => {setAmount(parseInt(e.target.value))}}
                    className='border-none focus-visible:ring-0 h-[90%]'
                    />
                </div>
                <Dialog>
                    <DialogTrigger className='flex'>
                    <div
                        className={`  w-full text-white bg-[#FE6711] font-black h-10 px-4 py-2
                        justify-between inline-flex items-center j text-sm transition-colors 
                        focus:bg-[#FE6711] rounded-none disabled:pointer-events-none disabled:opacity-50`}
                    >DONATE NOW <ArrowUpRight className='w-4 h-4'/></div>
                    </DialogTrigger>
                    <DialogContent className='flex flex-col items-center'>
                        <p className='font-extrabold text-2xl'>You are donating ${amount}</p>
                        <form className='flex flex-col gap-2 w-full p-4'>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">{individual ? "Name" : "Organisation"}</Label>
                                <Input id="name" 
                                placeholder={individual ? "Name of Individual" : "Name of Organisation"} 
                                type='text'
                                onChange={(e) => {setName(e.target.value)}}
                                required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                id="email" 
                                placeholder="exampe@eti.com"
                                type='email'
                                onChange={(e) => {setEmail(e.target.value)}}
                                required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone"
                                placeholder="+2347056437000"
                                type='tel'
                                onChange={(e) => {setPhone_number(e.target.value)}}
                                required
                                />
                            </div>
                            </form>
                            <Separator/>
                            {/* <p className='opacity-50'>choose donation method</p> */}
                            
                            <Button 
                            className='bg-[#FE6711] font-black h-10 px-4 py-2
                            justify-between inline-flex items-center text-sm transition-colors 
                            focus:bg-[#FE6711]'
                            onClick={() => {
                                if (name.trim() === '' || email.trim() === '' || phone_number.trim() === ''){
                                    alert("Fields are required")
                                    return
                                }
                                handleFlutterPayment({
                                    callback: (response) => {
                                        createDonation({
                                            "tx_ref": response.tx_ref,
                                            "email": response.customer.email,
                                            "phone_number": phone_number,
                                            "name": response.customer.name,
                                            "donor": donor,
                                            "amount": response.amount,
                                        })
                                        closePaymentModal() // this will close the modal programmatically
                                        router.push("/")
                                    },
                                    onClose: () => {
                                        setName("")
                                        setAmount(0)
                                        setPhone_number("")
                                        setEmail("")
                                    },
                                });
                            }}
                            >Donate Now!</Button>
                    </DialogContent>
                </Dialog>
            </div>            
        </div>
    );
};

export default DonateCard;