import { BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";

export class ChatEntity extends BaseEntity  {

    constructor(private props: ChatEntity.Props, id: string) {
        super(id)
        
        this.props = {
            participants: props.participants
        }

    }

    getParticipants(): string[] {
        return this.props.participants
    }

    isParticipant(id: string): boolean { 
        const participantFound = this.props.participants.find(participant => {return participant === id})
        return participantFound ? true : false
    }

}


export namespace ChatEntity {

    export type Props = {
        participants: string[]
    }
}