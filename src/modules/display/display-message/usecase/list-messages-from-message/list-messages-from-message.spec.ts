import { MessageRepositoryInterface } from "../../domain/repository"
import { mockMessageRepository } from "../tests"
import { ListMessagesFromMessageUsecase } from "./list-messages-from-message"
import { ListMessagesFromMessageUsecaseInputDto } from "./list-messages-from-message.dto"


type SutTypes = {
    sut: ListMessagesFromMessageUsecase
    props: ListMessagesFromMessageUsecaseInputDto
    messageRepository: MessageRepositoryInterface
}

const makeSut = (): SutTypes => {

    const props: ListMessagesFromMessageUsecaseInputDto = {
        messageId: "any_messageId"
    }
    const messageRepository = mockMessageRepository()
    jest.spyOn(messageRepository, "listMessagesFromMessageId")
    .mockResolvedValue([])

    const sut = new ListMessagesFromMessageUsecase(messageRepository)

    return {
        sut,
        props,
        messageRepository
    }
}


describe("test listMessagesFromMessage", () => {

    it("Should return right", async () => {
        const { sut, props } = makeSut()

        const output = await sut.execute(props)

        expect(output.isRight()).toEqual(true)
    })

    it("Should call messageRepository once", async () => {
        const { sut, props, messageRepository } = makeSut()
        
        await sut.execute(props)

        expect(messageRepository.listMessagesFromMessageId).toBeCalledTimes(1)
    })
})
