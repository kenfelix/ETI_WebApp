import { FC } from 'react';
import QuestionAnswer from './sub/question-ans';
import { Q_A } from '@/constants/constant';
import LearnButton from './sub/learn-button';


interface FAQsProps {}

const FAQs: FC<FAQsProps> = () => {
    return (
        <div className='px-[20px] lg:px-[70px] py-[30px] w-full'>
            <div className='bg-[#FFF6F1] flex flex-col md:flex-row gap-10 justify-center items-start w-full px-[15px] md:px-0 py-[70px]'>

                {/* left */}

                <div className='flex flex-col gap-5 md:max-w-[30%] text-center md:text-left'>
                    <h3 className='text-[25px] font-black font-serif'>We&apos;ve been <br /> saving sight and <br /> changing lives around <br /> the world.</h3>
                    <p className='font-medium text-[#3D3C47] font-sans'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p className='tetx-[#5E5C64] text-[10px]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex asperiores officia nostrum maiores unde perferendis? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex asperiores officia nostrum maiores unde perferendis?</p>
                </div>

                {/* right */}
                <div className='flex flex-col md:max-w-[50%] gap-4 max-h-[500px]'>
                    <div className='flex flex-col overflow-y-auto gap-4 pr-4 max-h-[300px]'>
                        {Q_A.map((qa, index) => (
                            <QuestionAnswer key={index}
                            question={qa.question} 
                            answer={qa.answer}/>
                        ))}
                    </div>
                    <p className='text-[#FE6B17] text-[20px] my-4'>A relationship where we care</p>
                    <LearnButton route={'/donate'} title="Learn how you can help"/>
                </div>

            </div>
        </div>
    );
};

export default FAQs;