import { randomUUID } from 'node:crypto'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const links = pgTable('links', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  originalUrl: text('original_url').notNull(),
  shortUrl: text('short_url').notNull(),
  accessCount: integer('access_count'),
  createdAt: timestamp('created_At').defaultNow().notNull(),
})
