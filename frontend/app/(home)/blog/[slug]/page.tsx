"use client"

import Image from "next/image"
import { useParams, useRouter} from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import {Clock, MessageCircle, Reply, ThumbsUp, User, UserCircleIcon, UserIcon} from "lucide-react"
import { Separator } from "@/components/ui/separator";
import { getPostBySlug, getPosts } from "@/utils/actions";
import { Post } from "@/utils/getData";
import { convertFromRaw } from "draft-js";
import { FC, Fragment, useEffect, useState } from "react";
import { convertToHTML } from 'draft-convert';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ArticleCard from "@/components/sub/article";

interface BlogDetailedPageProps {}

const BlogDetailedPage: FC<BlogDetailedPageProps> = () => {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [html, setHtml] = useState("")
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
    const { slug } = useParams()
    const router = useRouter()

    useEffect(
        () => {
            getPostBySlug(slug).then(
                (post: Post) => {
                    setTitle(post.title)
                    setCategory(post.category)
                    setImageURL(post.imageURL)
                    console.log(typeof post.content)
                    const contentState = convertFromRaw(post.content)
                    setHtml(convertToHTML(contentState))   
                }
            ).catch(
                (error)=>{
                    console.log(error)
                    router.push("/not-found")
                }
            )
        }, 
        [slug]
    )

    useEffect(
        () => {
            getPosts().then(
                (posts: Post[]) => {
                    const filtered = posts.filter((post) => post.category === category && post.title !== title)
                    setFilteredPosts(filtered)
                }
            ).catch(
                (error)=>{}
            )
        }, 
        [category]
    )
    
    return (
        <div className='flex w-full p-3 md:p-10'>

            {/* left */}
            <div className='w-full md:w-[70%] flex flex-col gap-[30px]'>
                <Image
                    src={`http://localhost:8000/${imageURL}`}
                    alt="Image"
                    className="object-cover w-full h-[400px]"
                    width={0}
                    height={0}
                    unoptimized
                    />

                <p className="text-[#FC7223] text-[14px] font-semibold">{category} |   <span>12-03-2023</span></p>
                <h3 className='font-serif font-bold text-[30px]'>{title}</h3>

                <ScrollArea className="max-h-[400px] w-full">
                <p dangerouslySetInnerHTML= {{__html:html}}></p>
                </ScrollArea>

                <Separator/>
                
                <div className="flex flex-col gap-4">
                    <Card className="border-none sm:border">
                    {/* <CardHeader className="px-0 sm:p-6">
                        <CardTitle className="text-[25px] sm:text-[35px] text-[#FC7223]">Comments</CardTitle>
                        <CardDescription className="text-[18px]">Your email address will not be published. Required field are marked *</CardDescription>
                    </CardHeader>
                    <CardContent className="px-0 sm:p-6">
                        <div className="flex flex-col gap-6" id="comments">
                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="message">Your reply *</Label>
                                <Textarea placeholder="Type your message here." id="message" className="h-[200px] bg-white" required onChange={(e) => setMessage(e.target.value)}/>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="name">Name *</Label>
                                    <Input type="name" id="name" placeholder="Enter Name" className="bg-white" required onChange={(e) => setName(e.target.value)}/>
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input type="email" id="email" placeholder="Enter Email Address" className="bg-white" required onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="px-0 sm:p-6">
                        <Button>POST COMMENT</Button>
                    </CardFooter> */}
                                        
                    </Card>
                        {/* comments */}
                        {/* <Fragment >
                            <div className="flex gap-1">
                                <div className="bg-slate-400 h-fit">
                                    <User className="text-white h-10 w-10"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className=""><span className="font-bold"> kenfelix </span>1 hour ago </p>
                                    <p className="text-lg sm:text-xl">wondeful article. it really help me understand the topic better</p>
                                    <Separator className="my-2" />
                                </div>                        
                            </div>
                        </Fragment> */}

                    {/* related stories */}
                    <div className="mb-[150px] md:mb-[60px] mt-[30px]">
                        <Label className="text-[25px] sm:text-[35px] mb-5 text-[#FC7223]">Related Posts</Label>
                        {filteredPosts.length === 0 ? (
                            <p className="font-sans text-sm w-full text-center">No related posts found!</p>
                        ) : (
                            filteredPosts.map((post, index) => (
                            <ArticleCard news={post} key={index} />
                            ))
                        )}
                    </div>

                    
                
                </div>

                {/* right */}

                <div className='w-[30%] hidden md:block'>    
                </div>
            </div>
        </div>
    );
};

export default BlogDetailedPage;