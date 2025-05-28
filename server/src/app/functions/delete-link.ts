import { db } from '@/infra/db'
import { links } from '@/infra/db/schemas/links'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { InvalidShortUrlInput } from './errors/invalid-short-url-input'
import { ShortUrlNotFound } from './errors/short-url-not-found'

const deleteLinkInputSchema = z.object({
  shortUrl: z
    .string()
    .min(1)
    .regex(/^[A-Za-z0-9\-._~!$&'()*+,;=:@]+$/, {
      message:
        'shortUrl must contain only valid URL path characters (letters, numbers, and allowed symbols)',
    }),
})

type DeleteLinkInput = z.input<typeof deleteLinkInputSchema>

export async function deleteLink(
  input: DeleteLinkInput
): Promise<Either<ShortUrlNotFound | InvalidShortUrlInput, null>> {
  const result = deleteLinkInputSchema.safeParse(input)

  if (!result.success) {
    return makeLeft(new InvalidShortUrlInput())
  }

  const { shortUrl } = result.data

  const response = await db
    .delete(links)
    .where(eq(links.shortUrl, shortUrl))
    .returning()

  if (response.length < 1) {
    return makeLeft(new ShortUrlNotFound())
  }

  return makeRight(null)
}
