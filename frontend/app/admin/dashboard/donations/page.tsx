import AdminHeader from '@/components/sub/admin-header';
import DonationDataTable from '@/components/sub/donation-data-table';
import { getDonations } from '@/utils/getData';
import { FC } from 'react';

export type Donation = {
    tx_ref: string
    email: string
    phone_number: string
    name: string
    donor: string
    amount: string
}

interface AdminDonationPageProps {}

const AdminDonationPage: ({}: AdminDonationPageProps) => Promise<JSX.Element> = async () =>  {
    const donations: Donation[] = await getDonations()
    return (
        <div className='flex flex-col w-full p-10 gap-6'>
            <AdminHeader title={"manage Donations"}/>
            <DonationDataTable data={donations}/>
        </div>
    );
};

export default AdminDonationPage;