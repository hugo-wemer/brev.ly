import type { ComponentProps } from 'react'

interface IconButtonProps extends ComponentProps<'button'> {}

export function IconButton(props: IconButtonProps) {
  return (
    <button
      className="size-8 bg-gray-200 text-gray-600 rounded-sm transition-colors duration-300 border border-transparent hover:border-blue-base cursor-pointer flex justify-center items-center"
      {...props}
      // flex justify-between items-center
    />
  )
}
