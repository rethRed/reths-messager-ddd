export class ParticipantsAllowedExceededError extends Error {
    constructor() {
      super(`The number of participants allowed exceeded the quantity allowed.`);
      this.name = "ParticipantsAllowedExceededError";
    }
}