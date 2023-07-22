"use client"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Toggle } from "@/components/ui/toggle"

import { FC, useEffect, useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState, convertToRaw, convertFromRaw} from "draft-js"
import { Editor } from "react-draft-wysiwyg";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { createProjectCategory, getImages, getProjectByID, updateProject, uploadProjectImage } from "@/utils/actions";
import { useParams, useRouter } from "next/navigation";
import { ChevronsUpDown } from "lucide-react"
import { toTitleCase } from "@/lib/utils"
import { getProjectCategories } from "@/utils/actions"
import Image from "next/image"
import { currencies } from "@/constants/constant";


interface AdminEditProjectProps {}

type Category = {
    label: string
    value : string
}

type ImageURL = {
    _id: string
    imageURL : string
}

const AdminEditProject: FC<AdminEditProjectProps> = () => {
    const [open, setOpen] = useState(false)
    const [dOpen, setDOpen] = useState(false)
    const [iOpen, setIOpen] = useState(false)
    const [fOpen, setFOpen] = useState(false)
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [title, setTitle] = useState("")
    const [goal, setGoal] = useState(0)
    const [raised, setRaised] = useState(0)
    const [currency, setCurrency] = useState("")
    const [category, setCategory] = useState("")
    const [newCategory, setNewCategory] = useState("")
    const [published, setPublished] = useState<boolean>()
    const [image, setImage] = useState<File | null | string>(null)
    const [imageURL, setImageURL] = useState("")

    const { id } = useParams()
    const router = useRouter()

    const [categories, setcategories] = useState<Category[]>([])
    const [imageURLs, setImageURLs] = useState<ImageURL[]>([])
    
    useEffect(
        () => {
            getProjectByID(id).then(
                (project) => {
                    setTitle(project?.title || "")
                    setCategory(project?.category || "")
                    setGoal(project?.goal || 0)
                    setRaised(project?.raised || 0)
                    setCurrency(project?.currency || "")
                    setPublished(project?.published)
                    setImageURL(project?.imageURL || "")
                    setEditorState(EditorState.createWithContent(convertFromRaw(project?.content)))
                }
            ).catch(
                (error) => {}
            )

            getProjectCategories().then(
                (categ) => {
                    setcategories(categ)
                }
            )

            getImages().then(
                (images) => {
                    setImageURLs(images)
                }
            )
        }, [id]
    )
    
    const onEditorStateChange = (editorState: EditorState) => {
        setEditorState(editorState)

        updateProject(
            {
                "content": convertToRaw(editorState.getCurrentContent())
            },
            id
        )
    }

    useEffect(() => {
        onTitleStateChange(title);
      }, [title]);

    useEffect(() => {
    onCategoryStateChange(category);
    }, [category]);

    useEffect(() => {
        onGoalStateChange(goal);
    }, [goal]);

    useEffect(() => {
        onRaisedStateChange(raised);
    }, [raised]);

    useEffect(() => {
        onCurrencyStateChange(currency);
    }, [,currency]);


    useEffect(() => {
    onImageURLStateChange(imageURL);
    }, [imageURL]);

    useEffect(() => {
        if (typeof published !== "undefined"){
            onPublishStateChange(published)}
        }, [published]);

    useEffect(() => {
    onImageStateChange(image);
    }, [image]);
    
      const onTitleStateChange = async (title: string) => {
        updateProject(
            {
                title
            },
            id
        )        
      };

      const onCategoryStateChange = async (category: string) => {
        if (category !== "") {
            updateProject(
                {
                    category
                },
                id
            )
        }        
      };

      const onGoalStateChange = async (goal: number) => {
        if (goal !== 0) {
            updateProject(
                {
                    goal
                },
                id
            )
        }        
      };

      const onRaisedStateChange = async (raised: number) => {
        if (raised !== 0) {
            updateProject(
                {
                    raised
                },
                id
            )
        }        
      };

      const onCurrencyStateChange = async (currency: string) => {
        if (currency !== "") {
            updateProject(
                {
                    currency
                },
                id
            )
        }        
      };

      const onImageURLStateChange = async (imageURL: string) => {
        if (imageURL !== "") {
            updateProject(
                {
                    imageURL
                },
                id
            )  
        }
              
      };


      const onPublishStateChange = async (published: boolean) => {
        updateProject(
            {
                published
            },
            id
        )
        setPublished(published)
      };

      const onImageStateChange = async (image: any) => {
        // Perform actions based on the new state
        if ((typeof image) !== null) {
            const f = new FormData()
            f.append("image", image)
            const URL = await uploadProjectImage(f)
            if (URL !== null) {
                setImageURL(URL)
            }
        }
      };

    return (
        <div className='flex flex-col w-full p-10 gap-6'>
            <div className='w-full flex items-baseline justify-between mb-5'>
                <h3 className='text-[#202162] font-black text-[22px] leading-5'>Edit Post <br />
                <span className='font-medium text-[13px]'>Edit posts sare saved automatically</span>
                </h3>
            </div>

            <div className="flex flex-row-reverse w-full">
                <Toggle pressed={published && typeof published !== "undefined" }
                    onPressedChange={onPublishStateChange}>
                    Pubished
                </Toggle>
            </div>

            <div className='bg-gray-50 p-2 pb-8 flex flex-col gap-10'>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input
                    className="w-full"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    type="text"
                    />
                </div>
                <Editor
                    editorState={editorState}
                    toolbarClassName="!flex !sticky !top-0 !z-50 !justify-center !mx-auto"
                    // wrapperClassName="wrapperClassName"
                    editorClassName="mt-6 bg-white shadow-lg max-w-5xl mx-auto mb-12 border p-10"
                    onEditorStateChange={onEditorStateChange}
                />
                <div className="flex w-full items-center justify-between gap-4">
                    <div className="grid max-w-sm items-center gap-1.5">
                        <Label htmlFor="image">Image</Label>
                        <Input 
                            id="image"
                            type="file"
                            className="cursor-pointer"
                            onChange={(e) => {
                                if (!e.target.files) return
                                setImage(e.target.files[0])
                                }}
                        />
                    </div>
                    <p className="font-sans font-semibold text-center">or select from library</p>
                    <Dialog open={iOpen} onOpenChange={setIOpen}>
                        <DialogTrigger onClick={() => console.log("library opened")}>
                        <Button
                            variant="outline"
                            className="w-[300px] justify-between"
                            >
                            {imageURL !== "" ? imageURL : "Select image"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
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
                                                    setImageURL(url.imageURL)
                                                    setIOpen(false)
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
                </div>
                
                <div className="">
                    <Label >Category</Label>
                    <div className="flex flex-row gap-[100px] justify-between">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-[300px] justify-between"
                                >
                                {category !== " " ? toTitleCase(category) : "Select Category"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="flex flex-col gap-2" align="end">
                                {
                                    categories.map((category) => (
                                        <div
                                            className="cursor-pointer"
                                            onClick={() => {
                                                setCategory(category.value)
                                                setOpen(false)
                                            }}
                                        >
                                            {category.label}
                                        </div>
                                    ))
                                }
                            </PopoverContent>
                        </Popover>
                        <Dialog open={dOpen} onOpenChange={setDOpen}>
                            <DialogTrigger><Button>Add New Category</Button></DialogTrigger>
                            <DialogContent className="flex items-center flex-col gap-5 pt-12">
                                <div className="grid w-full items-center gap-1.5">
                                    <Input
                                    className="w-full"
                                    required
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    id="image"
                                    type="text"
                                    />
                                </div>
                                <Button onClick={
                                    () => {createProjectCategory(
                                        {
                                            "label": toTitleCase(newCategory),
                                            "value": newCategory.toLowerCase()
                                        }
                                    )
                                    setDOpen(false)
                                    router.refresh()
                                    }}>
                                    Add
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="title" className="mb-4">Funds</Label>
                    <div className="flex flex-row gap-4 justify-between">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title">currency</Label>
                            <Popover open={fOpen} onOpenChange={setFOpen}>
                                <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-[300px] justify-between"
                                    >
                                    {currency !== " " ? currency : "Select Currency"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="gap-2" align="end">
                                    {
                                        currencies.map((currency) => (
                                            <div
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    setCurrency(currency.symbol)
                                                    setFOpen(false)
                                                }}
                                            >
                                                {currency.code}
                                            </div>
                                        ))
                                    }
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title">goal</Label>
                            <Input
                                className="w-full"
                                required
                                value={goal}
                                onChange={(e) => setGoal(parseInt(e.target.value))}
                                id="title"
                                type="number"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title">raised</Label>
                            <Input
                                className="w-full"
                                required
                                value={raised}
                                onChange={(e) => setRaised(parseInt(e.target.value))}
                                id="title"
                                type="number"
                            />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default AdminEditProject;