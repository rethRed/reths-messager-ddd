export class SignupEmailInUseError extends Error {
    constructor() {
      super(`Email already in use.`);
      this.name = "SignupEmailInUseError";
    }
}