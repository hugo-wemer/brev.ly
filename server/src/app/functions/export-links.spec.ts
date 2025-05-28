import { randomUUID } from 'node:crypto'
import * as upload from '@/infra/storage/upload-file-to-storage'
import { isRight, unwrapEither } from '@/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { describe, expect, it, vi } from 'vitest'
import { exportLinks } from './export-links'

describe('export links', () => {
  it('should be able to export all links', async () => {
    const uploadStub = vi
      .spyOn(upload, 'uploadFileToStorage')
      .mockImplementationOnce(async () => {
        return {
          key: `${randomUUID()}.csv`,
          url: 'http://example.com/file.csv',
        }
      })

    const shortUrlPattern = randomUUID()

    const link1 = await makeLink({ shortUrl: `link1-${shortUrlPattern}` })
    const link2 = await makeLink({ shortUrl: `link2-${shortUrlPattern}` })
    const link3 = await makeLink({ shortUrl: `link3-${shortUrlPattern}` })
    const link4 = await makeLink({ shortUrl: `link4-${shortUrlPattern}` })

    const sut = await exportLinks({
      shortUrl: shortUrlPattern,
    })

    const generatedCSVStream = uploadStub.mock.calls[0][0].contentStream
    const csvAsString = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = []

      generatedCSVStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      generatedCSVStream.on('end', () => {
        resolve(Buffer.concat(chunks).toString('utf-8'))
      })

      generatedCSVStream.on('error', err => {
        reject(err)
      })
    })

    const csvAsArray = csvAsString
      .trim()
      .split('\n')
      .map(row => row.split(','))

    console.log(csvAsArray)

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).reportUrl).toBe('http://example.com/file.csv')
    console.log(csvAsArray)
    expect(csvAsArray).toEqual([
      ['ID', 'Original URL', 'Short URL', 'Access Count', 'Created at'],
      [
        link1.id,
        link1.originalUrl,
        link1.shortUrl,
        link1.accessCount.toString(),
        expect.any(String),
      ],
      [
        link2.id,
        link2.originalUrl,
        link2.shortUrl,
        link2.accessCount.toString(),
        expect.any(String),
      ],
      [
        link3.id,
        link3.originalUrl,
        link3.shortUrl,
        link3.accessCount.toString(),
        expect.any(String),
      ],
      [
        link4.id,
        link4.originalUrl,
        link4.shortUrl,
        link4.accessCount.toString(),
        expect.any(String),
      ],
    ])
  })
})
