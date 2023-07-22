import "server-only"

import { cookies } from 'next/headers';
import axios from "axios";
import { API_URL } from "@/config";
import { User } from "lucide-react";

interface User {
    _id: string
    email: string
    confirmed: boolean
    privilege: number
}

export type Post = {
  _id: string
  title: string
  slug: string
  category: string
  content: any
  imageURL: string
  published: boolean
}


export type Project = {
  _id: string
  title: string
  slug: string
  category: string
  content: any
  imageURL: string
  raised: number
  goal: number
  currency: string
  published: boolean
}

export const getUsers = async () => {
    let cookie = cookies().get("access_token")
    
    const res = await axios.get(`${API_URL}/user/admin/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie?.value}`
      },
    })
    
    if (res.status === 200) {
        const users: User[] = res.data
        const privilegeLookup: Record<number, string> = {
          1: "user",
          2: "staff",
          3: "admin"
        };
        const updatedUsers = users.map(user => ({
          id: user._id,
          email: user.email,
          confirmed: user.confirmed,
          privilege: privilegeLookup[user.privilege] || ""
        }));
      return updatedUsers
    } else {
        return []
    }
}

export const getPosts = async () => {
  let cookie = cookies().get("access_token")
  
  const res = await axios.get(`${API_URL}/blog/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookie?.value}`
    },
  })
  
  if (res.status === 200) {
      const posts: Post[] = res.data
      return posts
  } else {
      return []
  }
}


export const getProjects = async () => {
  let cookie = cookies().get("access_token")
  
  const res = await axios.get(`${API_URL}/project/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookie?.value}`
    },
  })
  
  if (res.status === 200) {
      const project: Project[] = res.data
      return project
  } else {
      return []
  }
}


export const getPageContent = async(page: string) => {
  const response = await axios.get(`${API_URL}/dynamic/${page}`, {
      headers: {
          'Accept': 'application/json'
      },
      });

  return response.data
}

