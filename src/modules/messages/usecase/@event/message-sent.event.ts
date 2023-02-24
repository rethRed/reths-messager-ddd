import { Event } from "@/modules/@shared/event";

export class MessageSentEvent extends Event {
    
    constructor(
        private readonly props: MessageSentEvent.Props
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

namespace MessageSentEvent {
    export type Props = {
        id: string
        authorId: string
        chatId: string
        content: string
    }
}