export class InvalidEmailLengthError extends Error {
    constructor() {
      super(`The invalid email length`);
      this.name = "InvalidEmailLengthError";
    }
}