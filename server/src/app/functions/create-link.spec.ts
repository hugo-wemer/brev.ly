import { randomUUID } from 'node:crypto'
import { db } from '@/infra/db'
import { links } from '@/infra/db/schemas/links'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { eq } from 'drizzle-orm'
import { beforeEach, describe, expect, it } from 'vitest'
import { createLink } from './create-link'
import { DuplicatedShortUrl } from './errors/duplicated-short-url'
import { InvalidShortUrlInput } from './errors/invalid-short-url-input'

describe('create link', () => {
  it('should be able to create an new link', async () => {
    const id = randomUUID()
    const originalUrl = `http://${id}.com/integration`

    const sut = await createLink({
      originalUrl,
      shortUrl: `integration-${id}-test`,
    })
    expect(isRight(sut)).toBe(true)

    const result = await db
      .select()
      .from(links)
      .where(eq(links.originalUrl, originalUrl))
    expect(result).toHaveLength(1)
  })

  it('should not be able to create a short url that already exists', async () => {
    const id = randomUUID()
    const originalUrl = `http://${id}.com/integration`

    await createLink({
      originalUrl,
      shortUrl: `integration-${id}-test`,
    })

    const sut = await createLink({
      originalUrl,
      shortUrl: `integration-${id}-test`,
    })
    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(DuplicatedShortUrl)
  })

  it('should not be able to create an new link with a poorly short url format', async () => {
    const id = randomUUID()
    const originalUrl = `http://${id}.com/integration`

    const sut = await createLink({
      originalUrl,
      shortUrl: `integration/${id}/test`,
    })
    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(InvalidShortUrlInput)
  })
})
