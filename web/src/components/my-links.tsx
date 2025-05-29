import {
  Copy,
  CopyIcon,
  DownloadSimpleIcon,
  TrashIcon,
} from '@phosphor-icons/react'
import { Button } from './button'
import { IconButton } from './icon-button'
import {
  InputContainer,
  InputField,
  InputPrefix,
  InputRoot,
  InputTitle,
} from './input'
import { Separator } from './separator'

export function MyLinks() {
  return (
    <div className="bg-gray-100 w-[366px] md:w-[380px] rounded-lg p-6 md:p-8 flex flex-col gap-5">
      <div className="flex justify-between">
        <span className="font-bold text-lg">Meus links</span>
        <Button variant="secondary">
          <DownloadSimpleIcon />
          Baixar CSV
        </Button>
      </div>
      <Separator />
      <div>
        <div className="flex items-center gap-4 my-">
          <div className="text-nowrap flex flex-col gap-1 truncate">
            <a
              className="text-blue-base font-semibold text-sm/4.5"
              href="brev.ly/Portifolio-Dev"
            >
              brev.ly/Portifolio-Dev
            </a>
            <span className="text-gray-500 text-xs/4 truncate">
              devsite.portfolio.com.br/devname-123456
            </span>
          </div>
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
  )
}
