import { ChatMessageRepositoryInterface } from "../../domain/repository"
import { mockChatMessageRepository } from "../tests"
import { ListChatMessageUsecase } from "./list-chat-message.usecase"
import { ListChatMessageUsecaseInputDto } from "./list-chat-message.usecase.dto"

type SutTypes = {
    sut: ListChatMessageUsecase
    props: ListChatMessageUsecaseInputDto
    chatMessageRepository: ChatMessageRepositoryInterface
}

const makeSut = (): SutTypes => {

    const props: ListChatMessageUsecaseInputDto = {
        userId: "any_user_id",
        options: {
            skip: 10
        }
    }
    const chatMessageRepository = mockChatMessageRepository()
    jest.spyOn(chatMessageRepository, "list")
    .mockResolvedValue([])

    const sut = new ListChatMessageUsecase(chatMessageRepository)

    return {
        sut,
        props,
        chatMessageRepository
    }
}


describe("test list-chat-message usercase", () => {
    
    it("Should return right", async () => {
        const { sut, props } = makeSut()

        const output = await sut.execute(props)

        expect(output.isRight()).toBe(true)
    })

    it("Should call chatMessageRepository once", async () => {
        const { sut, props, chatMessageRepository } = makeSut()

        await sut.execute(props)

        expect(chatMessageRepository.list).toHaveBeenCalledTimes(1)
    })

})
