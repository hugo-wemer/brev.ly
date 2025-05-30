import { IconButton } from '@/components/icon-button'
import { env } from '@/env'
import { deleteLinks } from '@/http/delete-link'
import { queryClient } from '@/lib/react-query'
import { CheckIcon, CopyIcon, TrashIcon } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

interface LinkProps {
  originalUrl: string
  shortUrl: string
  accessCount: number
}

export function Link({ originalUrl, shortUrl, accessCount }: LinkProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(
        `${env.VITE_FRONTEND_URL}/${shortUrl}`
      )
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {}
  }

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
        <a
          className="text-blue-base font-semibold text-sm/4.5 truncate"
          href={`${env.VITE_FRONTEND_URL}/${shortUrl}`}
        >
          {`${env.VITE_FRONTEND_URL}/${shortUrl}`}
        </a>
        <span className="text-gray-500 text-xs/4 truncate">{originalUrl}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-500 text-xs/4 text-nowrap">
          {accessCount} acesso(s)
        </span>
        <div className="flex gap-1">
          <IconButton onClick={handleCopyLink}>
            {copied ? <CheckIcon /> : <CopyIcon />}
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
