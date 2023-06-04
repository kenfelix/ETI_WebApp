"use client"

import { FC } from 'react';
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, 
 } from '../ui/dialog';
import { Link, MenuIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Pages } from '@/constants/constant';
import { usePathname } from 'next/navigation';

interface MobileNavigationProps {}

const MobileNavigation: FC<MobileNavigationProps> = () => {
    const path = usePathname()
    return (
        <Dialog>
            <DialogTrigger asChild className='lg:hidden'>
                <Button variant="outline"><MenuIcon/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bottom-0">
                <nav className='flex flex-col items-center gap-4'>
                    { Pages.map((page, index) => (
                        <a key={index} href={page.link} className={`flex font-medium hover:text-orange-400 ${path === page.link? 'text-orange-400' : 'text-black'}`}> 
                            {page.title}
                        </a>
                    )) }
                </nav>
            </DialogContent>
            </Dialog>
    );
};

export default MobileNavigation;