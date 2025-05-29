import { IconButton } from '@/components/icon-button'
import { CopyIcon, TrashIcon } from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'

export function Link() {
  return (
    <div className="flex items-center gap-4 justify-between py-3">
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
        <span className="text-gray-500 text-xs/4 text-nowrap">30 acessos</span>
        <div className="flex gap-1">
          <IconButton>
            <CopyIcon />
            <span className="sr-only">Copy link</span>
          </IconButton>
          <IconButton>
            <TrashIcon />
            <span className="sr-only">Delete link</span>
          </IconButton>
        </div>
      </div>
    </div>
  )
}
