import { Event } from "@/modules/@shared/event";

export class ChatMessageCreatedEvent extends Event {
    
    constructor(
        private readonly props: ChatMessageCreatedEvent.Props
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

namespace ChatMessageCreatedEvent {
    export type Props = {
        id: string
        creatorId: string
        participantId: string
    }
}