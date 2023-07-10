'use client'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { FC } from 'react';

interface FormProps {}

const Form: FC<FormProps> = () => {
    const router = useRouter()
    const callbackUrl = '/admin/dashboard'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
                const body = JSON.stringify({"username": email, "password": password});
                const response = await axios.post('http://localhost:3000/api/login', body, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                });

                if (response.status === 200) {
                    // Login successful
                    router.push(callbackUrl)
                } else {
                // Login failed
                setError(response.statusText)
                }
            } catch (error: any) {
                console.log(error)
                setError(error.response.statusText)
            }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                className="w-full"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                className="w-full"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                />
            </div>
            {error && <Alert>{error}</Alert>}
            <div className="w-full">
                <Button className="w-full" size="lg">
                    Login
                </Button>
            </div>
        </form>
    );
};

export default Form;