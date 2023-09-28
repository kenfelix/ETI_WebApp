"use client"

import { FC } from 'react';
import { useState } from 'react';

interface QuestionAnswerProps {
    question: String
    answer: String
}

const QuestionAnswer: FC<QuestionAnswerProps> = ({question, answer}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='flex flex-col gap-2 max-w-full text-[12px]'>
            {isOpen ? 
            (<p className={`font-bold font-sans cursor-pointer`} onClick={() => (setIsOpen(false))}>- <span>{question}</span></p>)
            :
            (<p className={`font-bold font-sans cursor-pointer`} onClick={() => (setIsOpen(true))}>+ <span>{question}</span></p>)
            }
            <div className={`bg-[#FFFFFF] px-5 py-3 max-w-[280px] ${isOpen ? "block": "hidden"}`}>
                <p className='text-[10px] text-black font-sans'>{answer}</p>
            </div>
        </div>
    );
};

export default QuestionAnswer;