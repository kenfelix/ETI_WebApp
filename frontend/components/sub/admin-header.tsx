import { FC } from 'react';

interface AdminHeaderProps {
    title: string
}

const AdminHeader: FC<AdminHeaderProps> = ({title}) => {
    return (
        <div className='w-full flex items-center justify-between mb-5'>
            <h3 className='text-[#202162] font-black text-[22px] leading-5'>{title.toUpperCase()} <br />
            <span className='font-medium text-[13px]'>Welcome to Admin Dashboard!</span>
            </h3>

        </div>
    );
};

export default AdminHeader;