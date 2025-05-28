import { getLinks } from '@/app/functions/get-links'
import { unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links',
    {
      schema: {
        summary: 'Get links',
        tags: ['links'],
        querystring: z.object({
          shortUrl: z.string().optional(),
          sortBy: z.enum(['createdAt']).optional(),
          sortDirection: z.enum(['asc', 'desc']).optional(),
          page: z.coerce.number().optional().default(1),
          pageSize: z.coerce.number().optional().default(20),
        }),
        response: {
          200: z.object({
            links: z.array(
              z.object({
                id: z.string(),
                originalUrl: z.string().url(),
                shortUrl: z.string(),
                accessCount: z.number(),
                createdAt: z.date(),
              })
            ),
            total: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { page, pageSize, shortUrl, sortBy, sortDirection } = request.query

      const result = await getLinks({
        page,
        pageSize,
        shortUrl,
        sortBy,
        sortDirection,
      })

      const { links, total } = unwrapEither(result)
      return reply.status(200).send({ links, total })
    }
  )
}
