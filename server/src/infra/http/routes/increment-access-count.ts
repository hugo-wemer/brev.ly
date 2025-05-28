import { incrementAccessCount } from '@/app/functions/increment-access-count'
import { isRight, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const incrementAccessCountRoute: FastifyPluginAsyncZod =
  async server => {
    server.patch(
      '/incrementAccessCount',
      {
        schema: {
          summary: 'Increment the access count to a short URL',
          tags: ['links'],
          body: z.object({
            shortUrl: z
              .string()
              .min(1)
              .regex(/^[A-Za-z0-9\-._~!$&'()*+,;=:@]+$/, {
                message:
                  'shortUrl must contain only valid URL path characters (letters, numbers, and allowed symbols)',
              }),
          }),
          response: {
            200: z
              .object({
                updatedAccessCount: z.number(),
              })
              .describe('Access count updated.'),
            404: z
              .object({
                message: z.string(),
              })
              .describe('Short URL not found.'),
          },
        },
      },
      async (request, reply) => {
        const result = await incrementAccessCount({
          shortUrl: request.body.shortUrl,
        })
        if (isRight(result)) {
          return reply.status(200).send(unwrapEither(result)[0])
        }

        const error = unwrapEither(result)

        switch (error.constructor.name) {
          case 'ShortUrlNotFound':
            return reply.status(404).send({ message: error.message })
          default:
            return reply.status(400).send({ message: 'Unexpected error.' })
        }
      }
    )
  }
