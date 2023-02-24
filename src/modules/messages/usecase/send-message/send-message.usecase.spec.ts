import { eventEmitterInterface } from "@/modules/@shared/event"
import { mockEventEmiter } from "@/modules/@shared/tests"
import { AuthorEntity, ChatEntity } from "../../domain/entity"
import { AuthorRepositoryInterface, ChatRepositoryInterface, MessageRepositoryInterface } from "../../domain/repository"
import { mockAuthorRepository, mockChatRepository, mockMessageRepository } from "../tests"
import { AuthorNotFoundError, ChatNotFoundError, UnauthorizedAuthorError } from "./errors"
import { SendMessageUsecase } from "./send-message.usecase"
import { SendMessageUsecaseInputDto } from "./send-message.usecase.dto"

const mockAuthorEntity = (): AuthorEntity => {
    return new AuthorEntity({
        name: "any_name"
    }, "any_author_id")
}

const mockChatEntity = (participants?: string[]): ChatEntity => {
    return new ChatEntity({
        participants: participants ?? ["any_author_id"]
    }, "any_chat_id")
}

type SutTypes = {
    sut: SendMessageUsecase
    props: SendMessageUsecaseInputDto
    eventEmitter: eventEmitterInterface
    chatRepository: ChatRepositoryInterface
    authorRepository: AuthorRepositoryInterface
}

const makeSut = (): SutTypes => {

    const props: SendMessageUsecaseInputDto = {
        authorId: "any_author_id",
        chatId: "any_chat_id",
        content: "any_content"
    }

    const eventEmitter = mockEventEmiter()
    const chatRepository = mockChatRepository()
    jest.spyOn(chatRepository, "findById")
    .mockResolvedValue(mockChatEntity())
    const authorRepository = mockAuthorRepository()
    jest.spyOn(authorRepository, "findById")
    .mockResolvedValue(mockAuthorEntity())

    const sut = new SendMessageUsecase(authorRepository, chatRepository, eventEmitter )

    return {
        sut,
        props,
        eventEmitter,
        chatRepository,
        authorRepository
    }
}

describe("test sendMessageUsecase", () => {

    it("Should be return right", async () => {
        const { sut, props } = makeSut()
        
        const output = await sut.execute(props)

        expect(output.isRight()).toBe(true)
    })

    it("Should return an error if author is not found", async () => {
        const { sut, props, authorRepository } = makeSut()
        
        jest.spyOn(authorRepository, "findById")
        .mockResolvedValue(null)

        const output = await sut.execute(props)

        expect(output.value).toBeInstanceOf(AuthorNotFoundError)
    })

    it("Should return an error if chat is not found", async () => {
        const { sut, props, chatRepository } = makeSut()
        
        jest.spyOn(chatRepository, "findById")
        .mockResolvedValue(null)

        const output = await sut.execute(props)

        expect(output.value).toBeInstanceOf(ChatNotFoundError)
    })

    it("Should return an error if author is not a participant of chat", async () => {
        const { sut, props, chatRepository } = makeSut()
        
        jest.spyOn(chatRepository, "findById")
        .mockResolvedValue(mockChatEntity([]))

        const output = await sut.execute(props)

        expect(output.value).toBeInstanceOf(UnauthorizedAuthorError)
    })

    it("Should call event emmiter once", async () => {
        const { sut, props, eventEmitter } = makeSut()
    
        await sut.execute(props)

        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should call authorRepository.findById once", async () => {
        const { sut, props, authorRepository } = makeSut()
    
        await sut.execute(props)

        expect(authorRepository.findById).toHaveBeenCalledTimes(1)
    })

    it("Should call chatRepository.findById once", async () => {
        const { sut, props, chatRepository } = makeSut()
    
        await sut.execute(props)

        expect(chatRepository.findById).toHaveBeenCalledTimes(1)
    })

})
