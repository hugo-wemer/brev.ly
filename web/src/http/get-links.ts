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

interface GetLinksRequestParams {
  shortUrl?: string
}

export async function getLinks(params?: GetLinksRequestParams) {
  const response = await api.get('/links', { params })
  return response
}
