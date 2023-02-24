export class ProfileNotFoundError extends Error {
    constructor() {
      super(`Profile could not be found.`);
      this.name = "ProfileNotFoundError";
    }
}