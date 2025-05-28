export class DuplicatedShortUrl extends Error {
  constructor() {
    super('Short URL already exists.')
  }
}
