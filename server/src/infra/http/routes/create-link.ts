import { createLink } from '@/app/functions/create-link'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isRight, unwrapEither } from '@/shared/either'
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
          201: z.null().describe('Link created.'),
          409: z
            .object({
              message: z.string(),
            })
            .describe('Link already exists.'),
        },
      },
    },
    async (request, reply) => {
      const result = await createLink({
        originalUrl: request.body.originalUrl,
        shortUrl: request.body.shortUrl,
      })
      if (isRight(result)) {
        return reply.status(201).send()
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'DuplicatedShortUrl':
          return reply.status(409).send({ message: error.message })
        default:
          return reply.status(400).send({ message: 'Unexpected error.' })
      }
    }
  )
}
