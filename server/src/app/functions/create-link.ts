import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { z } from 'zod'
import { DuplicatedShortUrl } from './errors/duplicated-short-url'

const createLinkInputSchema = z.object({
  originalUrl: z.string().url(),
  shortUrl: z.string(),
})

type CreateLinkInput = z.input<typeof createLinkInputSchema>

export async function createLink(
  input: CreateLinkInput
): Promise<Either<DuplicatedShortUrl, { linkId: string }>> {
  const { originalUrl, shortUrl } = createLinkInputSchema.parse(input)

  try {
    await db.insert(schema.links).values({
      originalUrl,
      shortUrl,
    })
  } catch (error: any) {
    if (error.code === '23505') {
      // unique violation code error (https://www.postgresql.org/docs/current/errcodes-appendix.html)
      return makeLeft(new DuplicatedShortUrl())
    }
  }
  return makeRight({ linkId: '' })
}
