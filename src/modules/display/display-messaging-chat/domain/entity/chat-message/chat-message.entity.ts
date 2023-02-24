import { AggregateRoot, BaseEntity } from "@/modules/@shared/domain"
import { Either, left, right } from "@/modules/@shared/logic"


export class ChatMessageEntity extends BaseEntity implements AggregateRoot {
    
    constructor(public props: ProfileEntity.Props, id?: string) {
        super(id)


    }

}


export namespace ProfileEntity {
    

    export type Props = {
        chatName: string
        chatImage: string
        
    }

}