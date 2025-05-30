import { getLinks } from '@/http/get-links'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RedirectCard } from './components/redirect-card'

export function Redirect() {
  const { shortUrl } = useParams<{ shortUrl: string }>()
  useEffect(() => {
    async function fetchAndRedirect() {
      const { data } = await getLinks({ shortUrl })
      if (!data.total) {
        return
      }
      window.location.href = data.links[0].originalUrl
      // console.log(data.links)
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
