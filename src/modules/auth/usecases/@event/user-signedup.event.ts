import { Event } from "@/modules/@shared/event";


export class UserSignedupEvent extends Event {
    
    constructor(
        private readonly props: UserSignedupEvent.Props
    ) {
        super();
        this.schemaVersion = "1"
    }

    getPayload(): Event.getPayload {
        return {
            id: this.generateRandomId(),
            dateTimeOccorred: this.dateTimeOccorred,
            payload: this.props
        }
    }
} 

namespace UserSignedupEvent {
    export type Props = {
        id: string
        username: string
        email: string
        password: string
        status: string
    }
}