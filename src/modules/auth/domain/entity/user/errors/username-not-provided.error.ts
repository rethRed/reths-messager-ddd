export class UsernameNotProvidedError extends Error {
    constructor() {
      super(`Username was not provided.`);
      this.name = "UsernameNotProvidedError";
    }
}