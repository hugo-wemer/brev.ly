import { Button } from '@/components/button'
import { Separator } from '@/components/separator'
import { DownloadSimpleIcon, LinkIcon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { Link } from './link'

export function MyLinks() {
  const isLinkListEmpty = false
  const isLoadingLinks = true

  return (
    <motion.div
      data-progress={isLoadingLinks}
      className="bg-gray-100 w-[366px] md:w-[380px] lg:w-[580px] rounded-lg p-6 md:p-8 flex flex-col border border-transparent animate-border data-[progress=true]:[background:linear-gradient(45deg,#F9F9FB,theme(colors.gray.100)_50%,#F9F9FB)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.gray.100)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.gray.100/.48))_border-box]"
    >
      <div className="flex justify-between mb-3">
        <h1 className="font-bold text-lg">Meus links</h1>
        <Button variant="secondary">
          <DownloadSimpleIcon />
          Baixar CSV
        </Button>
      </div>
      <Separator />
      {isLinkListEmpty ? (
        <div className="my-6 flex flex-col gap-3 items-center justify-center h-full">
          <LinkIcon className="size-8 text-gray-400 " />
          <span className="uppercase text-gray-450 text-xxs">
            ainda não existem links cadastrados
          </span>
        </div>
      ) : (
        <div className="[&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-gray-200 ">
          <Link />
          <Link />
          <Link />
          <Link />
        </div>
      )}
    </motion.div>
  )
}
