export class PasswordNotProvidedError extends Error {
    constructor() {
      super(`Password is not provided.`);
      this.name = "PasswordNotProvidedError";
    }
}