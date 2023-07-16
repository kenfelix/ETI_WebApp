import AddPost from '@/components/sub/add-post';
import AdminHeader from '@/components/sub/admin-header';
import PostDataTable from '@/components/sub/post-data-table';
import { createPost } from '@/utils/actions';
import { getPosts, Post } from '@/utils/getData';

interface AdminPostPageProps {}

const AdminPostPage: ({}: AdminPostPageProps) => Promise<JSX.Element> = async () =>  {
    const posts: Post[] = await getPosts()
    return (
        <div className='flex flex-col w-full p-10 gap-6'>
            <AdminHeader title={"manage posts"}/>
            <AddPost title={'add'} id={''}/>
            <PostDataTable data={posts}/>
        </div>
    );
};

export default AdminPostPage;