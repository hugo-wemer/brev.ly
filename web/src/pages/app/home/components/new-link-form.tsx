import { Button } from '@/components/button'
import {
  InputContainer,
  InputField,
  InputPrefix,
  InputRoot,
  InputTitle,
} from '@/components/input'
import { postLink } from '@/http/post-link'
import { queryClient } from '@/lib/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const postLinkFormSchema = z.object({
  originalUrl: z.string().transform(val => {
    const hasProtocol = /^https?:\/\//i.test(val)
    return hasProtocol ? val : `http://${val}`
  }),
  shortUrl: z.string().transform(val =>
    val
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .trim()
  ),
})
type PostLinkForm = z.infer<typeof postLinkFormSchema>

export function NewLinkForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
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
      <InputRoot>
        <InputTitle>Link Original</InputTitle>
        <InputContainer>
          <InputField
            placeholder="www.exemplo.com.br"
            {...register('originalUrl')}
          />
        </InputContainer>
      </InputRoot>
      <InputRoot>
        <InputTitle>Link Encurtado</InputTitle>
        <InputContainer>
          <InputPrefix>brev.ly/</InputPrefix>
          <InputField {...register('shortUrl')} />
        </InputContainer>
      </InputRoot>
      <Button type="submit" disabled={isSubmitting}>
        Salvar link
      </Button>
    </form>
  )
}
