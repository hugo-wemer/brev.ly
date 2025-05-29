import { api } from '@/lib/axios'

export interface DeleteLinksRequest {
  shortUrl: string
}

export async function deleteLinks({ shortUrl }: DeleteLinksRequest) {
  const response = await api.delete('/link', {
    data: { shortUrl },
  })
  return response
}
