import { Copy } from '@phosphor-icons/react'
import { Button } from './button'
import { IconButton } from './icon-button'
import { InputField, InputRoot, InputTitle } from './input'

export function NewLinkForm() {
  return (
    <div className="bg-gray-100 w-[366px] md:w-[380px] rounded-lg p-6 md:p-8">
      <span className="font-bold text-lg">Novo link</span>
      <Button>Label</Button>
      <IconButton>
        <Copy />
      </IconButton>
      <InputRoot>
        <InputTitle>titulo</InputTitle>
        <InputField />
      </InputRoot>
    </div>
  )
}
