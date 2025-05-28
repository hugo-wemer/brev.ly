import { deleteLink } from '@/app/functions/delete-link'
import { isRight, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/link',
    {
      schema: {
        summary: 'Delete an link',
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
          204: z.null().describe('Link deleted.'),
          409: z
            .object({
              message: z.string(),
            })
            .describe('Link already exists.'),
        },
      },
    },
    async (request, reply) => {
      const result = await deleteLink({
        shortUrl: request.body.shortUrl,
      })
      if (isRight(result)) {
        return reply.status(204).send()
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
