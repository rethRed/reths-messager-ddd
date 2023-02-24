export class InvalidGroupNameError extends Error {
    constructor() {
      super(`Group name is invalid.`);
      this.name = "InvalidGroupNameError";
    }
}