
import { AggregateRoot, BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { ParticipantEntity } from "../participant/participant.entity";
import { InvalidGroupNameError } from "./errors";
import { ParticipantsAllowedExceededError } from "./errors/participants-allowed-excceeded.error";

export class ChatEntity extends BaseEntity implements AggregateRoot {
    
    private constructor(public props: ChatEntity.Props, id?: string) {
        super(id)
    }

    static create(input: ChatEntity.Input, id?: string): ChatEntity.Output {

        const chatEntity = new ChatEntity({
            participants: [],
            isGroupChat: input.isGroupChat,
            groupName: input.isGroupChat ? input.groupName : null
        }, id)

        const validate = chatEntity.validate()
        if(validate.isLeft()){
            return left(validate.value)
        }
        return right(chatEntity)
    }

    addParticipant(participant: ParticipantEntity): Either<Error, null> {
        if(!this.isGroupChat()){
            const participantsAllowed = 2
            if(this.getParticipants().length >= participantsAllowed) {
                return left(new ParticipantsAllowedExceededError())
            }
        }
        this.props.participants.push(participant)
        return right(null)
    }

    isGroupChat(): boolean {
        return this.props.isGroupChat
    }

    getParticipants(): ParticipantEntity[] {
        return this.props.participants
    }

    changeGroupName(newName: string): void {
        if(this.isGroupChat()){
            const currentGroupName = this.groupName 
            this.props.groupName = newName
            const validate = this.validate()
            if(validate.isLeft()) this.props.groupName = currentGroupName
        }
    }

    
    private validate(): Either<Error, null>{
        
        if(this.isGroupChat()){
            if( this.groupName.length < 4 || this.groupName.length > 100){
                return left(new InvalidGroupNameError())
            }
        }
        
        return right(null)
    }
    
    get groupName(): string {
        return this.props.groupName || ""
    }

}


export namespace ChatEntity {
    

    export type Props = {
        participants: ParticipantEntity[]
        isGroupChat: boolean
        groupName: string | null
    }

    export type Input = {
        isGroupChat: boolean
        groupName: string | null
    }

    export type Output = Either<Error, ChatEntity>
}