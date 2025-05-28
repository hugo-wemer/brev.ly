export class ShortUrlNotFound extends Error {
  constructor() {
    super('Short URL not found.')
  }
}
