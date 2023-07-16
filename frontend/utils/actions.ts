"use server"

import { API_URL } from '@/config';
import axios from 'axios';
import { cookies } from 'next/headers'

export async function deleteUser(queryParam: string) {
    const jwt = cookies().get('access_token')?.value
    const response = await axios.delete(`${API_URL}/user/admin`, {
        params: { 
            id: queryParam 
        },
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );
}

export async function updateUserPassword(id: string, password: string) {
    const cookie = cookies().get('access_token')
    // const params = new URLSearchParams({"id": id, "password": password}).toString();
    
    try{
        const res = await axios.put(`${API_URL}/user/admin/`, null, {
            params: {
                id,
                password
            },
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${cookie?.value}`,
            },
        });
    }catch (e){
        return e
    }
}

export async function getCurrentUser() {
    let cookie = cookies().get("access_token")
  
    const body = {
      "access_token": cookie?.value,
      "token_type": "string"
    }
    
    const res = await axios.post(`${API_URL}/user/validate/`, body, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    
    if (res.status === 200) {
        const user = res.data
        return user
    } else {
        return {}
    }
}

export async function createUser(data: {}) {
    let cookie = cookies().get("access_token")
  
    const body = data
    
    try{
        const res = await axios.post(`${API_URL}/user/`, body, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie?.value}`,
        },
        })
        
        if (res.status === 201) {
            const user = res.data
            return `${user.email} created succesfully!`
        } else {
            return `Couldn't created user!`
        }
    }catch{
        return `User Already exists!`
    }
}


// Post actions.....................................................................................
export async function createPost(data: {}) {
    let cookie = cookies().get("access_token")
  
    const body = data
    
    try{
        const res = await axios.post(`${API_URL}/blog/`, body, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie?.value}`,
        },
        })
        
        if (res.status === 201) {
            const post = res.data
            return post
        } else {
            return `Couldn't created post!`
        }
    }catch{
        return `Post Already exists!`
    }
}


export async function deletePost(queryParam: string) {
    const jwt = cookies().get('access_token')?.value
    const response = await axios.delete(`${API_URL}/blog/${queryParam}`, {
        // params: { 
        //     id: queryParam 
        // },
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );
}


export async function updatePost(data: {}, id: string) {
    let cookie = cookies().get("access_token")
  
    const body = data
    
    try{
        const res = await axios.put(`${API_URL}/blog/${id}`, body, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie?.value}`,
        },
        })
        
        if (res.status === 201) {
            const post = res.data
            return post
        } else {
            return `Couldn't created post!`
        }
    }catch{
        return `Post Already exists!`
    }
}


export async function getPostByID(id: string) {
    const jwt = cookies().get('access_token')?.value
    const response = await axios.get(`${API_URL}/blog/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );

    return response.data
}

export async function uploadImage(data: any) {
    let cookie = cookies().get("access_token")
    const body = data
    
    try{
        const res = await axios.post(`${API_URL}/blog/image`, body, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${cookie?.value}`,
        },
        })
        
        if (res.status === 201) {
            const imageURL = res.data
            return imageURL.imageURL
        } else {return null}
    }catch{return null}
}