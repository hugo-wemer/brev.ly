import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { z } from 'zod'
import { DuplicatedShortUrl } from './errors/duplicated-short-url'
import { InvalidShortUrlInput } from './errors/invalid-short-url-input'

const createLinkInputSchema = z.object({
  originalUrl: z.string().url(),
  shortUrl: z
    .string()
    .min(1)
    .regex(/^[A-Za-z0-9\-._~!$&'()*+,;=:@]+$/, {
      message:
        'shortUrl must contain only valid URL path characters (letters, numbers, and allowed symbols)',
    }),
})

type CreateLinkInput = z.input<typeof createLinkInputSchema>

export async function createLink(
  input: CreateLinkInput
): Promise<
  Either<DuplicatedShortUrl | InvalidShortUrlInput, { linkId: string }>
> {
  const result = createLinkInputSchema.safeParse(input)

  if (!result.success) {
    return makeLeft(new InvalidShortUrlInput())
  }

  const { originalUrl, shortUrl } = result.data

  try {
    await db.insert(schema.links).values({
      originalUrl,
      shortUrl,
    })
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    if (error.code === '23505') {
      // unique violation code error (https://www.postgresql.org/docs/current/errcodes-appendix.html)
      return makeLeft(new DuplicatedShortUrl())
    }
  }
  return makeRight({ linkId: '' })
}
