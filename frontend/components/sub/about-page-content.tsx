"use client"


import { FC, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { ChevronsUpDown, X, PlusIcon } from 'lucide-react';
import Image from "next/image"
import { ImageURL } from '@/app/admin/dashboard/posts/[id]/page';
import { deleteProjectPhoto, getImages, getPageContent, getProjectPhotos, updatePageContent, uploadProjectPhoto } from '@/utils/actions';
import { usePathname } from 'next/navigation';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState, convertToRaw, convertFromRaw} from "draft-js"
import { Editor } from "react-draft-wysiwyg";
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';

export type About = {
    heroImage: string,
    youtubeId: string
    ourStory: any
    arms: any
}

interface AdminAboutPageContentProps {}


const AdminAboutPageContent: FC<AdminAboutPageContentProps> = () => {
    const [hOpen, setHOpen] = useState(false)
    const [heroImage, setHeroImage] = useState("")
    const [youtubeId, setYoutubeId] = useState("")
    const [imageURLs, setImageURLs] = useState<ImageURL[]>([])
    const [projectPhotoURLs, setProjectPhotoURLs] = useState<ImageURL[]>([])
    const [ourStoryState, setOurStoryState] = useState(EditorState.createEmpty())
    const [armsState, setArmsState] = useState(EditorState.createEmpty())
    const [photo, setPhoto] = useState<File | null | string>(null)

    const path = usePathname().split("/")[3]

    const router = useRouter()

    useEffect(
        () => {
            getImages().then(
                (images) => {
                    setImageURLs(images)
                }
            )
            getProjectPhotos().then(
                (photos) => {
                    setProjectPhotoURLs(photos)
                }
            )
        }, [path==="about", photo]
    )

    useEffect(
        () => {
            getPageContent(path).then(
                (content: About) => {
                    setHeroImage(content.heroImage)
                    setYoutubeId(content.youtubeId)
                    setOurStoryState(EditorState.createWithContent(convertFromRaw(content.ourStory)))
                    setArmsState(EditorState.createWithContent(convertFromRaw(content.arms)))
                }
            )
        }, [path==="about"]
    )

    useEffect(() => {
        onPhotoStateChange(photo);
        }, [photo]);

    const onOurStoryStateChange = (editorState: EditorState) => {
        setOurStoryState(editorState)
    }
    const onArmsStateChange = (editorState: EditorState) => {
        setArmsState(editorState)
    }

    const onPhotoStateChange = async (image: any) => {
        // Perform actions based on the new state
        if ((typeof image) !== null) {
            const f = new FormData()
            f.append("image", image)
            await uploadProjectPhoto(f)
        }
      };
    return (
        <div>
            <p className="font-sans font-semibold">Hero Image</p>
            <Dialog open={hOpen} onOpenChange={setHOpen}>
                <DialogTrigger onClick={() => console.log("library opened")}>
                <div
                    className="w-[300px] justify-between flex items-center 
                    p-2 border-1 border rounded-lg cursor-pointer"
                    >
                    {heroImage !== "" ? heroImage : "Select image"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </div>
                </DialogTrigger>
                <DialogContent className="flex items-center max-h-screen flex-col gap-5 pt-12">
                    <div className="grid grid-cols-4 w-full items-center gap-1.5">
                        {
                            imageURLs.map((url) => (
                                url.imageURL !== "" ? (
                                    <div className="w-[100px] h-[100px]">
                                        <Image
                                        src={`http://localhost:8000/${url.imageURL}`}
                                        alt="image"
                                        width={100}
                                        height={100}
                                        unoptimized
                                        onClick={() => {
                                            setHeroImage(url.imageURL)
                                            setHOpen(false)
                                        }}
                                        className="cursor-pointer object-cover w-full h-full"
                                    />
                                    </div>
                                ) : null
                            ))
                        }
                        
                    </div>
                </DialogContent>
            </Dialog>
            {heroImage !== "" ? (
                <div className="w-[100px] h-[100px] mb-4 mt-2">
                    <Image
                    src={`http://localhost:8000/${heroImage}`}
                    alt="image"
                    width={100}
                    height={100}
                    unoptimized
                    className="object-cover w-full h-full"
                />
                </div>
            ) : <p/>}
            <div className='flex flex-col gap-2'>
                <p className="font-sans font-semibold">Youtube Video ID</p>
                <Input
                    className="w-full"
                    required
                    value={youtubeId}
                    onChange={(e) => setYoutubeId(e.target.value)}
                    id="youtube"
                    type="text"
                />
            </div>

            <div className='flex flex-col gap-2 mt-6'>
                <p className="font-sans font-semibold">Our Story</p>
                <Editor
                    editorState={ourStoryState}
                    toolbarClassName="!flex !sticky !top-0 !z-50 !justify-center !mx-auto"
                    // wrapperClassName="wrapperClassName"
                    editorClassName="mt-6 bg-white shadow-lg max-w-5xl mx-auto mb-12 border p-10"
                    onEditorStateChange={onOurStoryStateChange}
                />
            </div>

            <div className='flex flex-col gap-2'>
                <p className="font-sans font-semibold">Arms Of ETI</p>
                <Editor
                    editorState={armsState}
                    toolbarClassName="!flex !sticky !top-0 !z-50 !justify-center !mx-auto"
                    // wrapperClassName="wrapperClassName"
                    editorClassName="mt-6 bg-white shadow-lg max-w-5xl mx-auto mb-12 border p-10"
                    onEditorStateChange={onArmsStateChange}
                />
            </div>

            <Button
            onClick={() => {
                let data: About = {
                    heroImage: '',
                    youtubeId: '',
                    ourStory: undefined,
                    arms: undefined
                }
                console.log(heroImage)
                if (heroImage !== ""){data.heroImage = heroImage}
                if (youtubeId !== ""){data.youtubeId = youtubeId}
                if (ourStoryState !== EditorState.createEmpty())
                {data.ourStory = convertToRaw(ourStoryState.getCurrentContent())}
                if (armsState !== EditorState.createEmpty())
                {data.arms = convertToRaw(armsState.getCurrentContent())}
                updatePageContent(data, path)
            }}
            
            >Submit
            </Button>

            <div className='h-20'></div>
            <p className="font-sans font-semibold">Project PhotoBook</p>
            <div className="grid grid-cols-8 w-full items-center gap-1.5">
                {
                    projectPhotoURLs.map((url) => (
                        url.imageURL !== "" ? (
                            <div className=" flex w-[100px] h-[100px] relative">
                                <Image
                                src={`http://localhost:8000/${url.imageURL}`}
                                alt="image"
                                width={100}
                                height={100}
                                unoptimized
                                onClick={() => {
                                    setHeroImage(url.imageURL)
                                    setHOpen(false)
                                }}
                                className="cursor-pointer object-cover w-full h-full"
                            />
                            <X className="h-4 w-4 bg-white text-black absolute cursor-pointer"
                            onClick={() => {
                                deleteProjectPhoto(url.imageURL)
                                getProjectPhotos().then(
                                    (photos) => {
                                        setProjectPhotoURLs(photos)
                                    }
                                )
                                }} />
                            </div>
                        ) : null
                    ))
                }
                <div className="flex justify-center items-center">
                    <input
                    type="file"
                    className="appearance-none cursor-pointer w-0 items-center justify-center flex"
                    id="photo"
                    onChange={(e) => {
                        if (!e.target.files) return
                        setPhoto(e.target.files[0])
                        }}
                    />
                    {/* Lucide icon placed inside the input */}
                    <label htmlFor="photo" className="flex justify-center w-full h-full cursor-pointer items-center">
                    <PlusIcon className="w-full h-full text-lime-400" />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default AdminAboutPageContent;