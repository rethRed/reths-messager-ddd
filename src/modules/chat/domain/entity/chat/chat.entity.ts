
import { AggregateRoot, BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { Participant } from "../participant/participant.entity";

export class ChatEntity extends BaseEntity implements AggregateRoot {
    
    private constructor(public props: ChatEntity.Props, id?: string) {
        super(id)
    }

    static create(input: ChatEntity.Input, id?: string): ChatEntity.Output {

        const chatEntity = new ChatEntity({
            participants: input.participants,
            isGroupChat: input.isGroupChat,
            groupName: input.groupName
        }, id)

        const validate = chatEntity.validate()
        if(validate.isLeft()){
            return left(validate.value)
        }
        return right(chatEntity)
    }

    private validate(): Either<Error, null>{


        return right(null)
    }


}


export namespace ChatEntity {
    

    export type Props = {
        participants: Participant[]
        isGroupChat: boolean
        groupName: string | null
    }

    export type Input = {
        participants: Participant[]
        isGroupChat: boolean
        groupName: string | null
    }

    export type Output = Either<Error, ChatEntity>
}