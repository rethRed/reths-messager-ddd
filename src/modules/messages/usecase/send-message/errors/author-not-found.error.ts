export class AuthorNotFoundError extends Error {
    constructor() {
      super(`Author could not be found.`);
      this.name = "AuthorNotFoundError";
    }
}