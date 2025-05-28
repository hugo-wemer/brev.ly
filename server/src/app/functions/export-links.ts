import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/shared/either'
import { z } from 'zod'

const exportLinksInputSchema = z.object({
  shortUrl: z.string().optional(),
})

type ExportLinksOutput = {
  reportUrl: string
}

export async function exportLinks(): Promise<Either<never, ExportLinksOutput>> {
  const { sql } = db
    .select({
      id: schema.links.id,
      originalUrl: schema.links.originalUrl,
      shortUrl: schema.links.shortUrl,
      accessCount: schema.links.accessCount,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .toSQL()

  const cursor = pg.unsafe(sql).cursor(50)

  for await (const rows of cursor) {
    console.log(rows)
  }

  return makeRight({ reportUrl: '' })
}
