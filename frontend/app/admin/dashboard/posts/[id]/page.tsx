"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { FC, SetStateAction, useEffect, useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState, convertToRaw} from "draft-js"
import { Editor } from "react-draft-wysiwyg";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { getPostByID, updatePost, uploadImage } from "@/utils/actions";
import { Post } from "@/utils/getData";
import { useParams } from "next/navigation";


interface AdminEditPostProps {}

const AdminEditPost: FC<AdminEditPostProps> = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [newCategory, setNewCategory] = useState("")
    const [image, setImage] = useState<File | null | string>(null)
    const [imageURL, setImageURL] = useState("")

    const { id } = useParams()
    
    useEffect(
        () => {
            getPostByID(id).then(
                (post) => {
                    setTitle(post?.title || "")
                    setCategory(post?category : "")
                }
            ).catch(
                (error) => {}
            )
        }, [id]
    )
    

    const onEditorStateChange = (editorState: EditorState) => {
        setEditorState(editorState)

        updatePost(
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
    onImageURLStateChange(imageURL);
    }, [imageURL]);

    useEffect(() => {
    onImageStateChange(image);
    }, [image]);
    
      const onTitleStateChange = async (title: string) => {
        updatePost(
            {
                title
            },
            id
        )        
      };

      const onCategoryStateChange = async (category: string) => {
        if (category !== "") {
            updatePost(
                {
                    category
                },
                id
            )
        }        
      };

      const onImageURLStateChange = async (imageURL: string) => {
        if (imageURL !== "") {
            updatePost(
                {
                    imageURL
                },
                id
            )  
        }
              
      };

      const onImageStateChange = async (image: any) => {
        // Perform actions based on the new state
        if ((typeof image) !== null) {
            const f = new FormData()
            f.append("image", image)
            const URL = await uploadImage(f)
            if (URL !== null) {
                console.log('State changed:', URL);
                setImageURL(URL)
            }
        }
      };

    

    // console.log(typeof convertToRaw(editorState.getCurrentContent()))
    return (
        <div className='flex flex-col w-full p-10 gap-6'>
            <div className='w-full flex items-center justify-between mb-5'>
                <h3 className='text-[#202162] font-black text-[22px] leading-5'>Edit Post <br />
                <span className='font-medium text-[13px]'>Edit posts sare saved automatically</span>
                </h3>
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
                <div className="grid w-full items-center gap-1.5">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
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
                    <p>or select from library</p>
                    {/* implement library dialog */}
                </div>
                <div className="flex justify-between items-center">
                    <Select onValueChange={(value) => {setCategory(value)}}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Category" defaultValue={category}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
                            <SelectItem value=" ">None</SelectItem>
                            <SelectItem value="Acet">Acet</SelectItem>
                            <SelectItem value="Humanitarian">Humanitarian</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Dialog>
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
                            <Button>Add</Button>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            
        </div>
    );
};

export default AdminEditPost;