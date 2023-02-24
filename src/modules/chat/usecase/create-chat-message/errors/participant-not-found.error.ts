export class ParticipantNotFoundError extends Error {
    constructor() {
      super(`participant could not be found.`);
      this.name = "ParticipantNotFoundError";
    }
}