import { api } from '@/lib/axios'

export interface PostLinkRequest {
  originalUrl: string
  shortUrl: string
}

export async function postLink({ originalUrl, shortUrl }: PostLinkRequest) {
  const response = await api.post('/link', { originalUrl, shortUrl })
  return response.data
}
