export class UnauthorizedAuthorError extends Error {
    constructor() {
      super(`author is not authorized to send a message to this chat.`);
      this.name = "UnauthorizedAuthorError";
    }
}