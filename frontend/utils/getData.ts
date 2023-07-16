import "server-only"

import { NEWS } from '@/constants/constant';
// import axios from 'axios';
import { cookies } from 'next/headers';
import axios from "axios";
import { API_URL } from "@/config";
import { User } from "lucide-react";
// import { NextRequest } from 'next/server';

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

export const getBlogPosts = async () => {
    return NEWS
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


export const getBlogPost = async (slug: string) => {
    return NEWS.find((news) => news.slug === slug)
}

