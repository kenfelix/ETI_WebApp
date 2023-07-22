"use client" 


import { getPageContent } from '@/utils/actions';
import { convertToHTML } from 'draft-convert';
import { convertFromRaw } from 'draft-js';
import { FC, useEffect, useState } from 'react';
import { About } from '../sub/about-page-content';

interface ArmsProps {}

const Arms: FC<ArmsProps> = () => {
    const [html, setHtml] = useState("")
    useEffect(
        () => {
            getPageContent("about").then(
                (pageContent: About) => {
                    const contentState = convertFromRaw(pageContent.arms)
                    setHtml(convertToHTML(contentState))   
                }
            )
        }
    )
    return (
        <div className='max-w-[700px] text-center' dangerouslySetInnerHTML= {{__html:html}}></div>
    );
};

export default Arms;