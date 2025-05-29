import type { ComponentProps } from 'react'

interface InputRootProps extends ComponentProps<'div'> {
  error?: boolean
}
export function InputRoot({ error = false, ...props }: InputRootProps) {
  return (
    <div data-error={error} className="group flex flex-col gap-2" {...props} />
  )
}

interface InputTitleProps extends ComponentProps<'span'> {}
export function InputTitle(props: InputTitleProps) {
  return (
    <span
      className="text-xs/3.5 uppercase text-gray-500 group-focus-within:text-blue-base group-focus-within:font-bold group-data-[error=true]:text-danger"
      {...props}
    />
  )
}

interface InputFieldProps extends ComponentProps<'input'> {}
export function InputField(props: InputFieldProps) {
  return (
    <input
      className="w-full outline-0 px-4 border group-focus-within:border-2 border-gray-300 h-12 rounded-lg placeholder:text-gray-400 text-sm group-focus-within:border-blue-base focus:placeholder-transparent group-focus-within:font-normal group-focus-within:text-gray-600 group-data-[error=true]:border-danger"
      {...props}
    />
  )
}
