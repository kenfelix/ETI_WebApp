"use server"

import { API_URL } from '@/config';
import axios from 'axios';
import { cookies } from 'next/headers'
import { Post } from './getData';

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


export async function createPostCategory(data: {}) {
    let cookie = cookies().get("access_token")
  
    const body = data
    
    try{
        const res = await axios.post(`${API_URL}/blog/category/`, body, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie?.value}`,
        },
        })
        
        if (res.status === 201) {
            const postCategory = res.data
            return postCategory
        } else {
            return `Couldn't created category!`
        }
    }catch{
        return `Category Already exists!`
    }
}


export async function getPostCategories() {
    let cookie = cookies().get("access_token")
    
    const res = await axios.get(`${API_URL}/blog/category/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie?.value}`
      },
    })
    
    if (res.status === 200) {
        const categories = res.data
        return categories
    } else {
        return []
    }
}


export async function getImages() {
    let cookie = cookies().get("access_token")
    
    const res = await axios.get(`${API_URL}/blog/image/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie?.value}`
      },
    })
    
    if (res.status === 200) {
        const images = res.data
        return images
    } else {
        return []
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

export async function getPostBySlug(slug: string) {
    const jwt = cookies().get('access_token')?.value
    const response = await axios.get(`${API_URL}/blog/${slug}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );

    return response.data
}

export async function uploadPostImage(data: any) {
    let cookie = cookies().get("access_token")
    const body = data
    
    try{
        const res = await axios.post(`${API_URL}/blog/image/`, body, {
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


export async function getPosts() {
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



// Project actions.....................................................................................
export async function createProject(data: {}) {
    let cookie = cookies().get("access_token")
  
    const body = data
    
    try{
        const res = await axios.post(`${API_URL}/project/`, body, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie?.value}`,
        },
        })
        
        if (res.status === 201) {
            const project = res.data
            return project
        } else {
            return `Couldn't created post!`
        }
    }catch{
        return `Post Already exists!`
    }
}


export async function createProjectCategory(data: {}) {
    let cookie = cookies().get("access_token")
  
    const body = data
    
    try{
        const res = await axios.post(`${API_URL}/project/category/`, body, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie?.value}`,
        },
        })
        
        if (res.status === 201) {
            const postCategory = res.data
            return postCategory
        } else {
            return `Couldn't created category!`
        }
    }catch{
        return `Category Already exists!`
    }
}


export async function getProjectCategories() {
    let cookie = cookies().get("access_token")
    
    const res = await axios.get(`${API_URL}/project/category/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie?.value}`
      },
    })
    
    if (res.status === 200) {
        const categories = res.data
        return categories
    } else {
        return []
    }
}


export async function deleteProject(queryParam: string) {
    const jwt = cookies().get('access_token')?.value
    const response = await axios.delete(`${API_URL}/project/${queryParam}`, {
        // params: { 
        //     id: queryParam 
        // },
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );
}


export async function updateProject(data: {}, id: string) {
    let cookie = cookies().get("access_token")
  
    const body = data
    
    try{
        const res = await axios.put(`${API_URL}/project/${id}`, body, {
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
            return `Couldn't created project!`
        }
    }catch{
        return `Project Already exists!`
    }
}


export async function getProjectByID(id: string) {
    const jwt = cookies().get('access_token')?.value
    const response = await axios.get(`${API_URL}/project/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );

    return response.data
}

export async function getProjectBySlug(slug: string) {
    const response = await axios.get(`${API_URL}/project/${slug}`, {});

    return response.data
}

export async function uploadProjectImage(data: any) {
    let cookie = cookies().get("access_token")
    const body = data
    
    try{
        const res = await axios.post(`${API_URL}/project/image/`, body, {
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



// ----Dynamic Content--------------------------------------------------------------------------------------


export async function getPageContent(page: string) {
    const response = await axios.get(`${API_URL}/dynamic/${page}`, {
        headers: {
            'Accept': 'application/json'
        },
        });

    return response.data
}

export async function updatePageContent(data: {}, page: string) {
    let cookie = cookies().get("access_token")
  
    const body = data
    
    try{
        const res = await axios.put(`${API_URL}/dynamic/${page}`, body, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie?.value}`,
        },
        })
        
        if (res.status === 201) {
            const pageContent = res.data
            return pageContent
        } else {
            return `Couldn't update pageContent!`
        }
    }catch{
        return `pageContent Already exists!`
    }
}


export async function getProjectPhotos() {
    let cookie = cookies().get("access_token")
    
    try {
        const res = await axios.get(`${API_URL}/dynamic/image/`, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie?.value}`
                },
            })
            
            if (res.status === 200) {
                const photos = res.data
                return photos
            } else {
                return []
            }
    } catch (error) {
        return []
    }
}

export async function uploadProjectPhoto(data: any) {
    let cookie = cookies().get("access_token")
    const body = data
    
    try{
        const res = await axios.post(`${API_URL}/dynamic/image/`, body, {
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


export async function deleteProjectPhoto(imageUrl: string) {
    const jwt = cookies().get('access_token')?.value
    const response = await axios.delete(`${API_URL}/dynamic/%7BimageUrl%7D`, {
        params: { 
            imageURL: imageUrl,
        },
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );
}


export async function createDonation(data: {}) {
  
    const body = data
    
    try{
        const res = await axios.post(`${API_URL}/dynamic/donation/`, body, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        })
        
        if (res.status === 201) {
            const donation = res.data
            return donation
        } else {
            return `Couldn't created donation!`
        }
    }catch{
        return `Donation Already exists!`
    }
}