import { Button } from '@/components/button'
import { IconButton } from '@/components/icon-button'
import { Separator } from '@/components/separator'
import { CopyIcon, DownloadSimpleIcon, TrashIcon } from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'

export function MyLinks() {
  return (
    <div className="bg-gray-100 w-[366px] md:w-[380px] lg:w-[580px] rounded-lg p-6 md:p-8 flex flex-col gap-5">
      <div className="flex justify-between">
        <h1 className="font-bold text-lg">Meus links</h1>
        <Button variant="secondary">
          <DownloadSimpleIcon />
          Baixar CSV
        </Button>
      </div>
      <Separator />
      <div>
        <div className="flex items-center gap-4 justify-between">
          <div className="text-nowrap flex flex-col gap-1 truncate">
            <NavLink
              className="text-blue-base font-semibold text-sm/4.5"
              to="brev.ly/Portifolio-Dev"
            >
              brev.ly/Portifolio-Dev
            </NavLink>
            <span className="text-gray-500 text-xs/4 truncate">
              devsite.portfolio.com.br/devname-123456
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-xs/4 text-nowrap">
              30 acessos
            </span>
            <div className="flex gap-1">
              <IconButton>
                <CopyIcon />
              </IconButton>
              <IconButton>
                <TrashIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
