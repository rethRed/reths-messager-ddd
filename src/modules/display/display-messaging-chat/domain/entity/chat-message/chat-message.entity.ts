import { AggregateRoot, BaseEntity } from "@/modules/@shared/domain"
import { Either, left, right } from "@/modules/@shared/logic"


export class ChatMessageEntity extends BaseEntity implements AggregateRoot {
    
    constructor(public props: ProfileEntity.Props, id?: string) {
        super(id)


    }

    get chatName(): string {
        return this.props.chatName
    }
    get chatImage(): string {
        return this.props.chatImage
    }
}


export namespace ProfileEntity {
    
    export type Props = {
        chatName: string
        chatImage: string
    }

}