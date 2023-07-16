import AdminHeader from '@/components/sub/admin-header';
import AdminSpinerCard from '@/components/sub/admin-spinner-card';
import BarChart from '@/components/sub/bar-chart';
import DataTable from '@/components/sub/data-table';
import { FC } from 'react';

interface AdminDashboardProps {}

const AdminDashboard: FC<AdminDashboardProps> = () => {
    return (
        <div className='flex flex-col w-full p-10 gap-6'>
            <AdminHeader title={'dashboard'}/>
            <div className='flex gap-5'>
                <AdminSpinerCard color={'#F47960'} percentage={'18'} 
                name={'Recieved Messages'} icon={"MessageSquare"} count={1500}/>
                <AdminSpinerCard color={'#F47960'} percentage={'10'} 
                name={'Donations'} icon={"Bookmark"} count={2500}/>
                <AdminSpinerCard color={'#F47960'} percentage={'12'} 
                name={'Partners'} icon={"UserCircle"} count={1700}/>
                <AdminSpinerCard color={'#F47960'} percentage={'19'} 
                name={'Traffic Received'} icon={"ClipboardCheck"} count={1600}/>
            </div>
            <div className='w-full h-[500px] flex flex-row items-center gap-4'>
                <BarChart/>
                <DataTable/> 
            </div>
        </div>
    );
};

export default AdminDashboard;