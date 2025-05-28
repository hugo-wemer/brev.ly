import { randomUUID } from 'node:crypto'
import { isRight, unwrapEither } from '@/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { describe, expect, it } from 'vitest'
import { deleteLink } from './delete-link'

describe('delete links', () => {
  it('should be able to delete a link', async () => {
    const shortUrlPattern = randomUUID()
    const link1 = await makeLink({
      shortUrl: `linkToBeDeleted-${shortUrlPattern}`,
    })

    const sut = await deleteLink({
      shortUrl: `linkToBeDeleted-${shortUrlPattern}`,
    })

    expect(isRight(sut)).toBe(true)
  })
})
