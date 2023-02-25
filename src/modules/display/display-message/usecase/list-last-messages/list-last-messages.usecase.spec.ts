import { MessageRepositoryInterface } from "../../domain/repository"
import { mockMessageRepository } from "../tests"
import { ListLastMessagesUsecase } from "./list-last-messages.usecase"
import { ListLastMessagesUsecaseInputDto } from "./list-last-messages.usecase.dto"

type SutTypes = {
    sut: ListLastMessagesUsecase
    props: ListLastMessagesUsecaseInputDto
    messageRepository: MessageRepositoryInterface
}

const makeSut = (): SutTypes => {

    const props: ListLastMessagesUsecaseInputDto = {
        chatId: "any_chatId"
    }
    const messageRepository = mockMessageRepository()
    jest.spyOn(messageRepository, "listLastMessages")
    .mockResolvedValue([])

    const sut = new ListLastMessagesUsecase(messageRepository)

    return {
        sut,
        props,
        messageRepository
    }
}



describe("test listLastMessage ", () => {

    it("Should return right", async () => {
        const { sut, props } = makeSut()
        
        const output = await sut.execute(props)

        expect(output.isRight()).toBe(true)
    
    })

    it("Should call messageRepository once", async () => {
        const { sut, props, messageRepository } = makeSut()
        
        await sut.execute(props)

        expect(messageRepository.listLastMessages).toBeCalledTimes(1)
    })

})

