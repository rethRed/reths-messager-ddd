export class InvalidEmailError extends Error {
    constructor(email: string) {
      super(`The e-mail "${email}" is invalid.`);
      this.name = "InvalidEmailError";
    }
}