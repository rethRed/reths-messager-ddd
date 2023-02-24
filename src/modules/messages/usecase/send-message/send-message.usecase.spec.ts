import { eventEmitterInterface } from "@/modules/@shared/event"
import { mockEventEmiter } from "@/modules/@shared/tests"
import { AuthorRepositoryInterface, ChatRepositoryInterface, MessageRepositoryInterface } from "../../domain/repository"
import { mockAuthorRepository, mockChatRepository, mockMessageRepository } from "../tests"
import { SendMessageUsecase } from "./send-message.usecase"
import { SendMessageUsecaseInputDto } from "./send-message.usecase.dto"

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
    const authorRepository = mockAuthorRepository()

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

})
