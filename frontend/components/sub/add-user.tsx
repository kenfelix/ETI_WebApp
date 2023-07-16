"use client"

import { UserPlus2, X } from 'lucide-react';
import { FC, useState } from 'react';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { useForm } from 'react-hook-form';
import { createUser } from '@/utils/actions';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"

interface AddUserProps {}

const FormSchema = z.object({
    email: z.string().min(2, {
      message: "Must be a valid email",
    })
    .email("This is not a valid email."),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})


const AddUser: FC<AddUserProps> = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
        email: "",
        password: "",}
    })
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const { toast } = useToast()
// 2. Define a submit handler.
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try{
        const res = await createUser(data)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setOpen(false)
        router.refresh()
        toast({
            description: res,
            })
        }catch{}
    }

    return (
        <Dialog open={open} >
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <div className='w-full'>
                    <Button variant={'outline'} className='shadow-sm'>
                        <UserPlus2 className='mr-2'/>New User
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <div onClick={() => setOpen(false)} className="absolute cursor-pointer right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </div>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="example@eti.com" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="**************" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        
                        <div className='flex flex-row-reverse'>
                            <Button type="submit">Create user</Button>
                        </div>
                    </form>
                </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddUser;