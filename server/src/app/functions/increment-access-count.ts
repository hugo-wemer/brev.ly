import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { links } from '@/infra/db/schemas/links'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { DuplicatedShortUrl } from './errors/duplicated-short-url'
import { InvalidShortUrlInput } from './errors/invalid-short-url-input'
import { ShortUrlNotFound } from './errors/short-url-not-found'

const incrementAccessCountInputSchema = z.object({
  shortUrl: z
    .string()
    .min(1)
    .regex(/^[A-Za-z0-9\-._~!$&'()*+,;=:@]+$/, {
      message:
        'shortUrl must contain only valid URL path characters (letters, numbers, and allowed symbols)',
    }),
})

type IncrementAccessCountInput = z.input<typeof incrementAccessCountInputSchema>

type IncrementAccessCountOutput = {
  updatedAccessCount: number
}[]

export async function incrementAccessCount(
  input: IncrementAccessCountInput
): Promise<
  Either<InvalidShortUrlInput | ShortUrlNotFound, IncrementAccessCountOutput>
> {
  const result = incrementAccessCountInputSchema.safeParse(input)

  if (!result.success) {
    return makeLeft(new InvalidShortUrlInput())
  }

  const { shortUrl } = result.data

  const updated = await db
    .update(links)
    .set({
      accessCount: sql`${links.accessCount} + 1`,
    })
    .where(eq(links.shortUrl, shortUrl))
    .returning({
      updatedAccessCount: links.accessCount,
    })

  if (updated.length === 0) {
    return makeLeft(new ShortUrlNotFound())
  }

  return makeRight(updated)
}
