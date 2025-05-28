import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/shared/either'
import { asc, count, desc, ilike } from 'drizzle-orm'
import { z } from 'zod'

const getLinksInputSchema = z.object({
  searchQuery: z.string().optional(),
  sortBy: z.enum(['createdAt']).optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
  page: z.number().optional().default(1),
  pageSize: z.number().optional().default(20),
})

type GetLinksInput = z.input<typeof getLinksInputSchema>
type GetLinksOutput = {
  total: number
  links: {
    id: string
    originalUrl: string
    shortUrl: string
    accessCount: number
    createdAt: Date
  }[]
}

export async function getLinks(
  input: GetLinksInput
): Promise<Either<never, GetLinksOutput>> {
  const { searchQuery, sortBy, sortDirection, page, pageSize } =
    getLinksInputSchema.parse(input)

  const [links, [{ total }]] = await Promise.all([
    db
      .select({
        id: schema.links.id,
        originalUrl: schema.links.originalUrl,
        shortUrl: schema.links.shortUrl,
        accessCount: schema.links.accessCount,
        createdAt: schema.links.createdAt,
      })
      .from(schema.links)
      .where(
        searchQuery
          ? ilike(schema.links.shortUrl, `%${searchQuery}%`)
          : undefined
      )
      .orderBy(fields => {
        if (sortBy && sortDirection === 'asc') {
          return asc(fields[sortBy])
        }
        if (sortBy && sortDirection === 'desc') {
          return desc(fields[sortBy])
        }
        return desc(fields.createdAt)
      })
      .offset((page - 1) * pageSize)
      .limit(pageSize),

    db
      .select({ total: count(schema.links.id) })
      .from(schema.links)
      .where(
        searchQuery
          ? ilike(schema.links.shortUrl, `%${searchQuery}%`)
          : undefined
      ),
  ])

  return makeRight({ links, total })
}
