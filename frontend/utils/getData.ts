import { NEWS } from '@/constants/constant';

export const getBlogPosts = async () => {
    return NEWS
}

export const getBlogPost = async (slug: string) => {
    return NEWS.find((news) => news.slug === slug)
}

