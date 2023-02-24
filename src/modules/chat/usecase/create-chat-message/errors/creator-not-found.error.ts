export class CreatorNotFoundError extends Error {
    constructor() {
      super(`Creator could not be found.`);
      this.name = "CreatorNotFoundError";
    }
}