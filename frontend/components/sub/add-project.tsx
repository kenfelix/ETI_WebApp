"use client"

import { Edit2, UserPlus2} from 'lucide-react';
import { FC } from 'react';
import { Button } from '../ui/button';
import { Project } from '@/utils/getData';

import { useRouter } from 'next/navigation';
import { createProject } from '@/utils/actions';
import { EditorState, convertToRaw } from 'draft-js';

interface AddProjectProps {
    title: string
    id: string
}


const AddProject: FC<AddProjectProps> = ({title, id}) => {
    const router = useRouter()

    return (
        <div className='w-full'>
            {title === "add" ? 
                <Button variant={'outline'}
                    onClick={ async() => {
                        const editorState = EditorState.createEmpty()
                        const emptyProject: Project = await createProject(
                            {
                                "title": ' ',
                                "category": ' ',
                                "content": convertToRaw(editorState.getCurrentContent()),
                                "imageURL": ' ',
                                "raised": 0,
                                "goal": 0,
                                "currency": "$"
                            }
                        )
                        router.push(`/admin/dashboard/projects/${emptyProject._id}`)
                    }}
                    className='shadow-sm'>
                        <UserPlus2 className="mr-2" />Add Project
                </Button>
             : 
                <Button variant={'outline'}
                    onClick={() => router.push(`/admin/dashboard/projects/${id}`)}
                    className='shadow-sm'>
                        <Edit2 className="mr-2" />Edit Project
                </Button>
            } 
        </div>
    );
};

export default AddProject;