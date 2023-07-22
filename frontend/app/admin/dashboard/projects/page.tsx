import AddProject from '@/components/sub/add-project';
import AdminHeader from '@/components/sub/admin-header';
import ProjectDataTable from '@/components/sub/project-data-table';
import { Project, getProjects } from '@/utils/getData';

interface AdminProjectsPageProps {}

const AdminProjectsPage: ({}: AdminProjectsPageProps) => Promise<JSX.Element> = async () =>  {
    const projects: Project[] = await getProjects()
    return (
        <div className='flex flex-col w-full p-10 gap-6'>
            <AdminHeader title={"manage projects"}/>
            <AddProject title={'add'} id={''}/>
            <ProjectDataTable data={projects}/>
        </div>
    );
};

export default AdminProjectsPage;