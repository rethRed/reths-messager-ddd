import { AggregateRoot, BaseEntity } from "@/modules/@shared/domain"
import { AuthorEntity } from "../author/author.entity"


export class MessageEntity extends BaseEntity implements AggregateRoot {
    
    constructor(public props: MessageEntity.Props, id?: string) {
        super(id)
    }

    get dateTimeSent(): Date {
        return this.props.dateTimeSent
    }
    get content(): string {
        return this.props.content
    }
    get author(): AuthorEntity {
        return this.props.author
    }
}


export namespace MessageEntity {
    
    export type Props = {
        content: string
        chatId: string
        author: AuthorEntity
        dateTimeSent: Date
    }

}