export class ChatNotFoundError extends Error {
    constructor() {
      super(`Message Chat could not be found.`);
      this.name = "ChatNotFoundError";
    }
}