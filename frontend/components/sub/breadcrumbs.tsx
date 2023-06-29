import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import {ChevronRightIcon} from "lucide-react"

interface BreadCrumbsProps {
    pathnames: string[]
}

const BreadCrumbs: FC<BreadCrumbsProps> = ({pathnames}) => {
    const path = usePathname()
    return (
        <div className='flex'>
            {pathnames.map((pathname, index) => (
                <>
                    <Link key={index} href={pathname === 'home' ? '/' : pathname} className={`flex flex-col group font-bold
                            ${index === pathnames.length - 1 ? "text-gray-300" : "text-white"}`}>
                        {pathname.toUpperCase().replace("-", " ")}
                        <span className={`h-[1.9px] bg-orange-400 
                        group-hover:w-full transition-[width] ease duration-300
                        ${path === pathname ? 'w-full' : 'w-0'}`}>
                            &nbsp;</span>
                    </Link>
                    {index !== pathnames.length - 1 && <ChevronRightIcon/>} 
                </>
            ))}
        </div>
    );
};

export default BreadCrumbs;