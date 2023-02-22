import Crypto from "crypto";
import { Notification } from "../notification/notification";

export class BaseEntity {
    private _id: string
    public notification: Notification

    constructor(id?: string) {
        this._id = id || Crypto.randomUUID()
        this.notification = new Notification()
    }

    get id(): string {
        return this._id
    }

}