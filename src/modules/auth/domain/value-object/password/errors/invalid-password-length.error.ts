export class InvalidPasswordLengthError extends Error {
    constructor() {
      super(`Password length is not valid.`);
      this.name = "InvalidPasswordLengthError";
    }
}