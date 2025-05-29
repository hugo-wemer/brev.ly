import { api } from '@/lib/axios'

export interface GetLinksResponse {
  links: {
    id: string
    originalUrl: string
    shortUrl: string
    accessCount: number
    createdAt: string
  }[]
  total: number
}

export async function getLinks() {
  const response = await api.get('/links')
  return response
}
