import { Button } from '@/components/button'
import { Separator } from '@/components/separator'
import { downloadLinks } from '@/http/download-csv'
import { type GetLinksResponse, getLinks } from '@/http/get-links'
import {
  DownloadSimpleIcon,
  LinkIcon,
  SpinnerIcon,
} from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'motion/react'
import { Link } from './link'

export function MyLinks() {
  const { data, isLoading } = useQuery<GetLinksResponse>({
    queryKey: ['links'],
    queryFn: async () => {
      const response = await getLinks()
      return response.data
    },
  })

  async function downloadCsv() {
    const response = await downloadLinks()
    return response.data.reportUrl
  }

  return (
    <motion.div
      data-progress={isLoading}
      className="bg-gray-100 w-[366px] md:w-[380px] lg:w-[580px] rounded-lg p-6 md:p-8 flex flex-col border border-transparent animate-border data-[progress=true]:[background:linear-gradient(45deg,#F9F9FB,theme(colors.gray.100)_50%,#F9F9FB)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.gray.100)_80%,_theme(colors.blue.500)_86%,_theme(colors.blue.300)_90%,_theme(colors.blue.500)_94%,_theme(colors.gray.100/.48))_border-box] overflow-scroll"
    >
      <div className="flex justify-between mb-3">
        <h1 className="font-bold text-lg">Meus links</h1>
        <Button
          variant="secondary"
          onClick={async () => {
            const url = await downloadCsv()
            window.open(url, '_blank')
          }}
        >
          <DownloadSimpleIcon />
          Baixar CSV
        </Button>
      </div>
      <Separator />
      {isLoading && (
        <div className="flex items-center justify-center h-32">
          <SpinnerIcon className="animate-spin" />
        </div>
      )}
      {!data?.total && !isLoading ? (
        <div className="my-6 flex flex-col gap-3 items-center justify-center h-full">
          <LinkIcon className="size-8 text-gray-400 " />
          <span className="uppercase text-gray-450 text-xxs">
            ainda não existem links cadastrados
          </span>
        </div>
      ) : (
        <div className="[&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-gray-200 ">
          {data?.links.map(link => {
            return (
              <Link
                key={link.id}
                originalUrl={link.originalUrl}
                shortUrl={link.shortUrl}
                accessCount={link.accessCount}
              />
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
