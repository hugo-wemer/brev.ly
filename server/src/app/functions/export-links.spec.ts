import { randomUUID } from 'node:crypto'
import { isRight, unwrapEither } from '@/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { describe, expect, it } from 'vitest'
import { exportLinks } from './export-links'
import { getLinks } from './get-links'

describe('export links', () => {
  it('should be able to export all links', async () => {
    const shortUrlPattern = randomUUID()

    const link1 = await makeLink({ shortUrl: `link1-${shortUrlPattern}` })
    const link2 = await makeLink({ shortUrl: `link2-${shortUrlPattern}` })
    const link3 = await makeLink({ shortUrl: `link3-${shortUrlPattern}` })
    const link4 = await makeLink({ shortUrl: `link4-${shortUrlPattern}` })

    const sut = await exportLinks()
  })
})
