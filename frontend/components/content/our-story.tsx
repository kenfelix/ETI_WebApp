"use client"

import { FC, useEffect, useState } from 'react';
import { getPageContent } from "@/utils/actions";
import { About } from '../sub/about-page-content';
import { convertFromRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';

interface OurStoryProps {}

const OurStory: FC<OurStoryProps> = () => {
    const [html, setHtml] = useState("")
    useEffect(
        () => {
            getPageContent("about").then(
                (pageContent: About) => {
                    const contentState = convertFromRaw(pageContent.ourStory)
                    setHtml(convertToHTML(contentState))   
                }
            )
        }
    )
    return (
        <div className='max-w-[700px] text-center' dangerouslySetInnerHTML= {{__html:html}}></div>
    );
};

export default OurStory;