import { createLink } from '@/app/functions/create-link'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/link',
    {
      schema: {
        summary: 'Create new link',
        body: z.object({
          originalUrl: z.string().url(),
          shortUrl: z.string(),
        }),
        response: {
          201: z.object({
            linkId: z.string(),
          }),
          409: z
            .object({
              message: z.string(),
            })
            .describe('Link already exists.'),
        },
      },
    },
    async (request, reply) => {
      const response = await createLink({
        originalUrl: request.body.originalUrl,
        shortUrl: request.body.shortUrl,
      })
      return reply.status(201).send({ linkId: 'teste' })
    }
  )
}
