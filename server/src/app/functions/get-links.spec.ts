import { randomUUID } from 'node:crypto'
import { isRight, unwrapEither } from '@/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { describe, expect, it } from 'vitest'
import { getLinks } from './get-links'

describe('get links', () => {
  it('should be able to get all links', async () => {
    const shortUrlPattern = randomUUID()

    const link1 = await makeLink({ shortUrl: `link1-${shortUrlPattern}` })
    const link2 = await makeLink({ shortUrl: `link2-${shortUrlPattern}` })
    const link3 = await makeLink({ shortUrl: `link3-${shortUrlPattern}` })
    const link4 = await makeLink({ shortUrl: `link4-${shortUrlPattern}` })

    const sut = await getLinks({})

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).total).toBeGreaterThanOrEqual(4)
  })

  it('should be able to get links using short url', async () => {
    const shortUrlPattern = randomUUID()

    await makeLink({ shortUrl: `link1-${shortUrlPattern}` })
    const link2 = await makeLink({ shortUrl: `link2-${shortUrlPattern}` })
    await makeLink({ shortUrl: `link3-${shortUrlPattern}` })
    await makeLink({ shortUrl: `link4-${shortUrlPattern}` })

    const sut = await getLinks({
      shortUrl: `link2-${shortUrlPattern}`,
    })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).total).toEqual(1)
    expect(unwrapEither(sut).links).toEqual([
      expect.objectContaining({ id: link2.id }),
    ])
  })
})
