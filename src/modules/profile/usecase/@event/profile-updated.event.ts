import { Event } from "@/modules/@shared/event";

export class ProfileUpdatedEvent extends Event {
    
    constructor(
        private readonly props: ProfileUpdatedEvent.Props
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

namespace ProfileUpdatedEvent {
    export type Props = {
        id: string
        image?: string | null
        description?: string | null
    }
}