"use client"


import { FC } from 'react';
import { icons } from 'lucide-react';
import SmallDoughnutChart from '@/components/sub/doughnut-chart';



interface AdminSpinerCardProps {
    color: string
    percentage: string
    name: string
    icon: string
    count: number
}

const AdminSpinerCard: FC<AdminSpinerCardProps> = ({color, percentage, name, icon, count}) => {
    const LucideIcon = icons[icon];
    return (
        <div className='w-[200px] h-[120px] shadow-md relative'>
            <div className='flex p-2 justify-between'>
                <div className='flex flex-col gap-[2px]'>
                    <LucideIcon className='w-5 h-5' />
                    <p className={`font-semibold text-[14px] text-[${color}]`}>{count}</p>
                    <p className={`font-medium text-[12px] font-sans`}>{name}</p>
                </div>
                <div className='flex flex-col items-center gap-1'>
                    <SmallDoughnutChart/>
                    <span className='text-[10px] font-semibold text-[#150E42]'>+{percentage}%</span>
                </div>
            </div>
            <div className={`absolute w-full bg-[${color}] h-[20%] -bottom-0`}></div>
            
        </div>
    );
};

export default AdminSpinerCard;