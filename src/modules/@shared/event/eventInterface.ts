import Crypto from "crypto"

export abstract class Event {
    dateTimeOccorred: Date = new Date();
    schemaVersion: string = ""
    generateRandomId(): string {
        return Crypto.randomUUID()
    }
    abstract getPayload(): Event.getPayload
}

export namespace Event {
    export type getPayload = {
        id: string 
        dateTimeOccorred: Date,
        payload: any
    }
}