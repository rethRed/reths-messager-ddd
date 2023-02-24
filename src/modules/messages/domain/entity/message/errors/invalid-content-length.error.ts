export class InvalidContentLengthError extends Error {
    constructor() {
      super(`Content length is invalid.`);
      this.name = "InvalidContentLengthError";
    }
}