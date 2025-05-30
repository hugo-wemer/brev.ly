import { env } from '@/env'
import { getLinks } from '@/http/get-links'
import { incrementAccessCount } from '@/http/increment-access-count'
import { queryClient } from '@/lib/react-query'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RedirectCard } from './components/redirect-card'

export function Redirect() {
  const { shortUrl } = useParams<{ shortUrl: string }>()
  useEffect(() => {
    async function fetchAndRedirect() {
      const { data } = await getLinks({ shortUrl })
      if (!data.total) {
        window.location.href = `${env.VITE_FRONTEND_URL}/404`
      }
      if (shortUrl) {
        await incrementAccessCount({ shortUrl })
        queryClient.invalidateQueries({ queryKey: ['links'] })
      }
      window.location.href = data.links[0].originalUrl
    }
    //
    fetchAndRedirect()
  }, [shortUrl])
  return (
    <div className="px-3 h-dvh flex justify-center items-center">
      <RedirectCard />
    </div>
  )
}
