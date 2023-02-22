export class InvalidUsernameLengthError extends Error {
    constructor() {
      super(`Username length is invalid.`);
      this.name = "InvalidUsernameLengthError";
    }
}