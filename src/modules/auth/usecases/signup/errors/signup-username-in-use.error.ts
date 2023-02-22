export class SignupUsernameInUseError extends Error {
    constructor() {
      super(`Username is already in use.`);
      this.name = "SignupUsernameInUseError";
    }
}