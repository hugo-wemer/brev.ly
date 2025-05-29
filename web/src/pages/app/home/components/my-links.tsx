import { Button } from '@/components/button'
import { Separator } from '@/components/separator'
import { DownloadSimpleIcon } from '@phosphor-icons/react'
import { Link } from './link'

export function MyLinks() {
  return (
    <div className="bg-gray-100 w-[366px] md:w-[380px] lg:w-[580px] rounded-lg p-6 md:p-8 flex flex-col">
      <div className="flex justify-between mb-3">
        <h1 className="font-bold text-lg">Meus links</h1>
        <Button variant="secondary">
          <DownloadSimpleIcon />
          Baixar CSV
        </Button>
      </div>
      <Separator />
      <div className="[&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-gray-200 ">
        <Link />
        <Link />
        <Link />
        <Link />
      </div>
    </div>
  )
}
