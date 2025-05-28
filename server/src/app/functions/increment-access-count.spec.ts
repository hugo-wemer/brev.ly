import { randomUUID } from 'node:crypto'
import { isRight, unwrapEither } from '@/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { describe, expect, it } from 'vitest'
import { incrementAccessCount } from './increment-access-count'

describe('increment access count', () => {
  it('should be able to increment the access count of a link', async () => {
    const shortUrlPattern = randomUUID()
    await makeLink({
      shortUrl: `linkToIncrement-${shortUrlPattern}`,
    })

    const sut = await incrementAccessCount({
      shortUrl: `linkToIncrement-${shortUrlPattern}`,
    })

    expect(isRight(sut)).toBe(true)

    expect(unwrapEither(sut)).toEqual([
      expect.objectContaining({ updatedAccessCount: expect.any(Number) }),
    ])
  })
})
