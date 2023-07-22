import ArticleCard from '@/components/sub/article';
import {Post, getPosts} from "@/utils/getData"
import Image from  "next/image" 
import BreadCrumbs from '@/components/sub/breadcrumbs';
import people from "@/public/people.jpg"
import DonationNow from '@/components/sub/donate-now';

interface BlogPageProps {}


const BlogPage: ({}: BlogPageProps) => Promise<JSX.Element> = async () => {
    const posts: Post[] = await getPosts()
    const publishedPosts = posts.filter((post) => post.published === true)
    return (
        <div className='flex flex-col justify-center gap-[20px] items-center mb-[100px]'>
            <div className="relative w-full h-[500px]">
                <Image
                src={people}
                alt="Image"
                className="object-cover w-full h-full"
                />
                <div className='flex flex-col gap-[50px] text-white absolute top-0 left-0 h-full w-full justify-center items-center'>
                    <h3 className='font-extrabold shadow-sm text-[50px] leading-[50px] lg:text-[70px] lg:leading-[70px] font-sans'>BLOG POSTS</h3>
                    <BreadCrumbs/>
                    <DonationNow/>
                </div>
            </div>
            <div>
                <h5 className='text-[#FC7223] text-[30px] font-semibold mt-[50px]'>NEWS UPDATE</h5>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {publishedPosts.map((news, index) => (
                    <ArticleCard key={index} news={news} />
                ))}
            </div>
        </div>
    );
};

export default BlogPage;