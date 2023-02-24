export class ChatAlreadyCreateError extends Error {
    constructor() {
      super(`Can't create a chat twice.`);
      this.name = "ChatAlreadyCreateError";
    }
}