export class DocumentNotFoundError extends Error {
  constructor(idOrSlug: number | string) {
    const message =
      typeof idOrSlug === 'number'
        ? `Document with id ${idOrSlug} not found`
        : `Document with slug ${idOrSlug} not found`;
    super(message);
    this.name = 'DocumentNotFoundError';
  }
}
