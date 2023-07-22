import ArticleCard from './sub/article';
import LearnButton from './sub/learn-button';
import { Post, getPosts } from '@/utils/getData';


interface NewsUpdateProps {}

const NewsUpdate: ({}: NewsUpdateProps) => Promise<JSX.Element> = async ({}) => {
    const posts: Post[] = await getPosts()
    return (
        <div className='bg-[#EEF3F2] pt-[40px] pb-[150px] px-[10px] md:px-0'>
            <div className='flex flex-col items-center justify-center gap-6'>
                <h5 className='text-[#FC7223] text-[10px] font-semibold'>NEWS UPDATE</h5>
                <h3 className='font-serif font-bold text-[30px] max-w-[400px] text-center'>Popular Articles & What Going On</h3>
                <div className='flex flex-col md:flex-row gap-4'>
                    {posts.map((news, index) => (
                        <ArticleCard key={index} news={news} />
                    ))}
                    
                </div>
                <div  className='flex justify-center w-full items-center'>
                    <LearnButton route={'/blog'} title="Show More News Updates"/>
                </div>
            </div>
        </div>
    );
};

export default NewsUpdate;