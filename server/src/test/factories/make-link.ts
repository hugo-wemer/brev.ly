import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { fakerPT_BR as faker } from '@faker-js/faker'
import type { InferInsertModel } from 'drizzle-orm'

export async function makeLink(
  overrides?: Partial<InferInsertModel<typeof schema.links>>
) {
  const pathName = faker.system.fileName()

  const result = await db
    .insert(schema.links)
    .values({
      originalUrl: `https://teste.com/${pathName}`,
      shortUrl: pathName,
      accessCount: 0,
      ...overrides,
    })
    .returning()

  return result[0]
}
