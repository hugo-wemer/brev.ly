import { Button } from '@/components/button'
import {
  InputContainer,
  InputField,
  InputPrefix,
  InputRoot,
  InputTitle,
} from '@/components/input'
import { env } from '@/env'
import { postLink } from '@/http/post-link'
import { queryClient } from '@/lib/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { WarningIcon } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const postLinkFormSchema = z.object({
  originalUrl: z
    .string()
    .transform(val => {
      const trimmed = val.trim()
      return /^https?:\/\//i.test(trimmed) ? trimmed : `http://${trimmed}`
    })
    .refine(
      val => {
        try {
          new URL(val)
          return !/\s/.test(val)
        } catch {
          return false
        }
      },
      { message: 'URL inválida' }
    ),
  shortUrl: z
    .string()
    .transform(val =>
      val
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .trim()
    )
    .refine(val => !/\s/.test(val), {
      message: 'URL inválida.',
    }),
})
type PostLinkForm = z.infer<typeof postLinkFormSchema>

export function NewLinkForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<PostLinkForm>({
    resolver: zodResolver(postLinkFormSchema),
  })

  const { mutateAsync: createLink } = useMutation({
    mutationFn: postLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
    },
  })

  async function handleCreateLink(data: PostLinkForm) {
    await createLink(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateLink)}
      className="bg-gray-100 w-[366px] md:w-[380px] rounded-lg p-6 md:p-8 flex flex-col gap-5 h-fit"
    >
      <h1 className="font-bold text-lg">Novo link</h1>
      <InputRoot error={!!errors.originalUrl}>
        <InputTitle>Link Original</InputTitle>
        <InputContainer>
          <InputField
            placeholder="www.exemplo.com.br"
            {...register('originalUrl')}
          />
        </InputContainer>
        {!!errors.originalUrl && (
          <div className="flex items-center gap-2">
            <WarningIcon className="size-4 text-danger mb-1" />
            <span className="text-xs/4">{errors.originalUrl.message}</span>
          </div>
        )}
      </InputRoot>
      <InputRoot error={!!errors.shortUrl}>
        <InputTitle>Link Encurtado</InputTitle>
        <InputContainer>
          <InputPrefix>{env.VITE_FRONTEND_URL}/</InputPrefix>
          <InputField {...register('shortUrl')} />
        </InputContainer>
        {!!errors.shortUrl && (
          <div className="flex items-center gap-2">
            <WarningIcon className="size-4 text-danger mb-1" />
            <span className="text-xs/4">{errors.shortUrl.message}</span>
          </div>
        )}
      </InputRoot>
      <Button type="submit" disabled={isSubmitting}>
        Salvar link
      </Button>
    </form>
  )
}
