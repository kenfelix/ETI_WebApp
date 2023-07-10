import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { FC } from 'react';
import Form  from '@/components/login';

interface AdminPageProps {}

const AdminPage: FC<AdminPageProps> = () => {
    return (
        <div className='flex items-center justify-center w-full h-screen' >
            <Form/>
        </div>
    );
};

export default AdminPage;