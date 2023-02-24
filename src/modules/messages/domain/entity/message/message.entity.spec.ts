import { AuthorEntity } from "../author/author.entity"
import { ChatEntity } from "../chat/chat.entity"
import { InvalidContentLengthError } from "./errors"
import { MessageEntity } from "./message.entity"

type SutTypes = {
    sut: MessageEntity
    props: MessageEntity.Input
}

const makeSut = (): SutTypes => {

    const props: MessageEntity.Input = {
        content: "any_content",
        author: new AuthorEntity({ name: "John"}, "any_author_id"),
        chat: new ChatEntity({}, "any_chat_id")
    }
    const sut = MessageEntity.create(props)

    if(sut.isLeft()){
        throw sut.value
    }

    return {
        sut: sut.value,
        props
    }

}

describe("test message entity", () => {

    it("Should create a message entity", () => {
        const { props } = makeSut()

        const sut = MessageEntity.create(props, "any_id")
        
        if(sut.isLeft()){
            throw sut.value
        }

        expect(sut.value).toBeInstanceOf(MessageEntity)
        expect(sut.value.id).toBe("any_id")
        expect(sut.value.content).toBe("any_content")
        expect(sut.value.author).toBeInstanceOf(AuthorEntity)
        expect(sut.value.author.id).toBe("any_author_id")
        expect(sut.value.author.name).toBe("John")
        expect(sut.value.chat).toBeInstanceOf(ChatEntity)
        expect(sut.value.chat.id).toBe("any_chat_id")
    })

    it("Should return an error if an invalid content length is provided", () => {
        const { props } = makeSut()

        const sut = MessageEntity.create({
            ...props,
            content: "a".repeat(5001)
        }, "any_id")

        expect(sut.value).toBeInstanceOf(InvalidContentLengthError)
    })
})