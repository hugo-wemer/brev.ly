import { api } from '@/lib/axios'

export interface IncrementAccessCountRequest {
  shortUrl: string
}

export async function incrementAccessCount({
  shortUrl,
}: IncrementAccessCountRequest) {
  await api.patch('/incrementAccessCount', { shortUrl })
}
