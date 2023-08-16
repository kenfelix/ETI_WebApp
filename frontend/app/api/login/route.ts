import { API_URL } from '@/config';
import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';


const MAX_AGE = 60 * 60 * 24;
 
export async function POST(req: Request, res:Response) {
    
    const requestBody = await req.json();

    const body = new URLSearchParams({"username": requestBody.username, "password": requestBody.password}).toString();

    try {
        const response = await axios.post(`${API_URL}/user/admin/`, body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            });
            const { data } = response;

        if (response.status === 200 && data.access_token) {
            cookies().set({
                name: 'access_token',
                value: data.access_token,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: MAX_AGE,
                path: "/",
            })
            return NextResponse.json('', {
                status: 200,
                statusText: "Log in successful"
                })
        } else {
            return NextResponse.json('', {
                status: response.status,
                statusText: response.statusText
                })
        }
    } catch (error: any) {
        return NextResponse.json('', {
            status: error.response.status,
            statusText: error.response.data.detail
            })
    }
}
