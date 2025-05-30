import { api } from '@/lib/axios'

export interface DownloadLinksResponse {
  reportUrl: string
}

export async function downloadLinks() {
  const response = await api.post('/links/export')
  return response
}
