import AdminAboutPageContent from "@/components/sub/about-page-content";
import AdminHeader from "@/components/sub/admin-header";

interface AdminAboutPageProps {}

const AdminAboutPage: ({}: AdminAboutPageProps) => Promise<JSX.Element> = async () =>  {
    return (
        <div className='flex flex-col w-full p-10 gap-6'>
            <AdminHeader title={"manage about page"}/>
            <AdminAboutPageContent/>
        </div>
    );
};

export default AdminAboutPage;