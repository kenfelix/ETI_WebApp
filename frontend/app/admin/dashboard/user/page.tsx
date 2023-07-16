import AddUser from '@/components/sub/add-user';
import AdminHeader from '@/components/sub/admin-header';
import UserDataTable from '@/components/sub/user-data-table';
import { getUsers } from "@/utils/getData"

export interface CurrentUser {
    _id: string
    email: string
    password: string
    confirmed: boolean
    privilege: number
    created_at: string
    timestamp: string
}
interface UsersPageProps {}


const UsersPage: ({}: UsersPageProps) => Promise<JSX.Element> = async () =>  {
    const users = await getUsers()
    return (
        <div className='flex flex-col w-full p-10 gap-6'>
            <AdminHeader title={"manage users"}/>
            <AddUser/>
            <UserDataTable data={users}/>
        </div>
    );
};

export default UsersPage;