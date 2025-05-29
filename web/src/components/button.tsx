import { clsx } from 'clsx'
import type { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary'
}

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      data-variant={variant}
      className={clsx(
        'font-semibold transition-colors duration-300 border border-transparent cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'primary' && [
          'px-5 h-12 rounded-lg bg-blue-base text-white text-sm/4.5 hover:bg-blue-dark  w-full',
        ],
        variant === 'secondary' && [
          'px-2 h-8 rounded-sm bg-gray-200 text-gray-600 text-xs/4 hover:border-blue-base w-fit flex justify-center items-center gap-1.5 disabled:border-transparent',
        ],
        className
      )}
      {...props}
    />
  )
}
