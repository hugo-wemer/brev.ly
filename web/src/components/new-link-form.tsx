import { Copy } from '@phosphor-icons/react'
import { Button } from './button'
import { IconButton } from './icon-button'
import {
  InputContainer,
  InputField,
  InputPrefix,
  InputRoot,
  InputTitle,
} from './input'

export function NewLinkForm() {
  return (
    <form className="bg-gray-100 w-[366px] md:w-[380px] rounded-lg p-6 md:p-8 flex flex-col gap-5">
      <span className="font-bold text-lg">Novo link</span>
      <InputRoot>
        <InputTitle>Link Original</InputTitle>
        <InputContainer>
          <InputField placeholder="www.exemplo.com.br" />
        </InputContainer>
      </InputRoot>
      <InputRoot>
        <InputTitle>Link Encurtado</InputTitle>
        <InputContainer>
          <InputPrefix>brev.ly/</InputPrefix>
          <InputField />
        </InputContainer>
      </InputRoot>
      <Button>Salvar link</Button>
    </form>
  )
}
