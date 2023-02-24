import { AggregateRoot, BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { AuthorEntity } from "../author/author.entity";
import { ChatEntity } from "../chat/chat.entity";
import { InvalidContentLengthError } from "./errors/invalid-content-length.error";

export class MessageEntity extends BaseEntity implements AggregateRoot {


    
    private constructor(public props: MessageEntity.Props, id?: string) {
        super(id)
    }

    static create(input: MessageEntity.Input, id?: string): MessageEntity.Output {

        const messageEntity = new MessageEntity({
            content: input.content,
            author: input.author,
            chat: input.chat,
        }, id)

        const validate = messageEntity.validate()
        if(validate.isLeft()){
            return left(validate.value)
        }
        return right(messageEntity)
    }

    private validate(): Either<Error, null>{

        if(this.content.length > 5000){
            return left(new InvalidContentLengthError())
        }

        return right(null)
    }

    get content(): string {
        return this.props.content
    }
    get author(): AuthorEntity {
        return this.props.author
    }
    get chat(): ChatEntity {
        return this.props.chat
    }

}


export namespace MessageEntity {
    

    export type Props = {
        author: AuthorEntity
        chat: ChatEntity
        content: string
    }

    export type Input = {
        author: AuthorEntity
        chat: ChatEntity
        content: string
    }

    export type Output = Either<Error, MessageEntity>
}