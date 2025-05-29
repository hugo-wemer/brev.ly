import { IconButton } from '@/components/icon-button'
import { env } from '@/env'
import { deleteLinks } from '@/http/delete-link'
import { queryClient } from '@/lib/react-query'
import { CopyIcon, TrashIcon } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { NavLink } from 'react-router-dom'

interface LinkProps {
  originalUrl: string
  shortUrl: string
  accessCount: number
}

export function Link({ originalUrl, shortUrl, accessCount }: LinkProps) {
  const { mutateAsync: deleteLink } = useMutation({
    mutationFn: deleteLinks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
    },
  })

  async function handleDeleteLink(shortUrl: string) {
    await deleteLink({ shortUrl })
  }

  return (
    <div className="flex items-center gap-4 justify-between py-3">
      <div className="text-nowrap flex flex-col gap-1 truncate">
        <NavLink
          className="text-blue-base font-semibold text-sm/4.5 truncate"
          to={`${env.VITE_FRONTEND_URL}/${shortUrl}`}
        >
          {`${env.VITE_FRONTEND_URL}/${shortUrl}`}
        </NavLink>
        <span className="text-gray-500 text-xs/4 truncate">{originalUrl}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-500 text-xs/4 text-nowrap">
          {accessCount} acesso(s)
        </span>
        <div className="flex gap-1">
          <IconButton>
            <CopyIcon />
            <span className="sr-only">Copy link</span>
          </IconButton>
          <IconButton onClick={() => handleDeleteLink(shortUrl)}>
            <TrashIcon />
            <span className="sr-only">Delete link</span>
          </IconButton>
        </div>
      </div>
    </div>
  )
}
