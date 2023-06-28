import { FC } from 'react';
import ArticleCard from './sub/article';
import { NEWS } from '@/constants/constant';
import LearnButton from './sub/learn-button';


interface NewsUpdateProps {}

const NewsUpdate: FC<NewsUpdateProps> = () => {
    return (
        <div className='bg-[#EEF3F2] pt-[40px] pb-[150px] px-[10px] md:px-0'>
            <div className='flex flex-col items-center justify-center gap-6'>
                <h5 className='text-[#FC7223] text-[10px] font-semibold'>NEWS UPDATE</h5>
                <h3 className='font-serif font-bold text-[30px] max-w-[400px] text-center'>Popular Articles & What Going On</h3>
                <div className='flex flex-col md:flex-row gap-4'>
                    {NEWS.map((news, index) => (
                        <ArticleCard key={index} image={news.image} category={news.category} title={news.title} content={news.content}/>
                    ))}
                    
                </div>
                <div  className='flex md:items-start w-[70%] md:w-[60%]'>
                    <LearnButton route={'/blog'} title="More Updates"/>
                </div>
            </div>
        </div>
    );
};

export default NewsUpdate;