export class EmailNotProvidedError extends Error {
    constructor() {
      super(`E-mail is not provided.`);
      this.name = "EmailNotProvidedError";
    }
}