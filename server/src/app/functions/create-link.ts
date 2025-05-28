import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { z } from 'zod'

const createLinkInputSchema = z.object({
  originalUrl: z.string().url(),
  shortUrl: z.string(),
})

type CreateLinkInput = z.input<typeof createLinkInputSchema>

export async function createLink(input: CreateLinkInput) {
  const { originalUrl, shortUrl } = createLinkInputSchema.parse(input)

  await db.insert(schema.links).values({
    originalUrl,
    shortUrl,
  })
}
