"use client"

import { Edit2, UserPlus2} from 'lucide-react';
import { FC } from 'react';
import { Button } from '../ui/button';
import { Post } from '@/utils/getData';

import { useRouter } from 'next/navigation';
import { createPost } from '@/utils/actions';
import { EditorState, convertToRaw } from 'draft-js';

interface AddPostProps {
    title: string
    id: string
}


const AddPost: FC<AddPostProps> = ({title, id}) => {
    const router = useRouter()

    return (
        <div className='w-full'>
            {title === "add" ? 
                <Button variant={'outline'}
                    onClick={ async() => {
                        const editorState = EditorState.createEmpty()
                        const emptyPost: Post = await createPost(
                            {
                                "title": ' ',
                                "category": ' ',
                                "content": convertToRaw(editorState.getCurrentContent()),
                                "imageURL": ' ',
                            }
                        )
                        router.push(`/admin/dashboard/posts/${emptyPost._id}`)
                    }}
                    className='shadow-sm'>
                        <UserPlus2 className="mr-2" />Add Post
                </Button>
             : 
                <Button variant={'outline'}
                    onClick={() => router.push(`/admin/dashboard/posts/${id}`)}
                    className='shadow-sm'>
                        <Edit2 className="mr-2" />Edit Post
                </Button>
            } 
        </div>
    );
};

export default AddPost;