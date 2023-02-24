import { eventEmitterInterface } from "@/modules/@shared/event"
import { mockEventEmiter } from "@/modules/@shared/tests"
import { ParticipantEntity } from "../../domain/entity"
import { ChatRepositoryInterface, ParticipantRepositoryInterface } from "../../domain/repository"
import { mockChatRepository, mockParticipantRepository } from "../tests"
import { CreateChatMessageUsecase } from "./create-chat-message.usecase"
import { CreateChatMessageUsecaseInputDto } from "./create-chat-message.usecase.dto"
import { ChatAlreadyCreateError, CreatorNotFoundError, ParticipantNotFoundError } from "./errors"

const makeParticipant = (id?: string): ParticipantEntity => {
    return new ParticipantEntity({username: "any_username"}, id ?? "any_id")
}


type SutTypes = {
    sut: CreateChatMessageUsecase
    props: CreateChatMessageUsecaseInputDto
    chatRepository: ChatRepositoryInterface
    participantRepository: ParticipantRepositoryInterface
    eventEmitter: eventEmitterInterface
}

const makeSut = (): SutTypes => {

    const props: CreateChatMessageUsecaseInputDto = {
        creatorId: "any_creator_id",
        participantId: "any_participant_id",
    }

    const chatRepository = mockChatRepository()
    jest.spyOn(chatRepository, "getChatByParticipants")
    .mockResolvedValue(null)
    const participantRepository = mockParticipantRepository()
    jest.spyOn(participantRepository, "findById")
    .mockResolvedValue(makeParticipant())
    const eventEmitter = mockEventEmiter()

    const sut = new CreateChatMessageUsecase(chatRepository, participantRepository, eventEmitter)
    return {
        sut,
        props,
        chatRepository,
        participantRepository,
        eventEmitter
    } 
}

describe("test createChatMessage usecase", () => {

    it("should return right", async () => {
        const { sut, props } = makeSut()

        const output = await sut.execute(props)

        expect(output.isRight()).toBe(true)
    })

    it("should return an error if a chat message between two participants already exists ", async () => {
        const { sut, props, chatRepository } = makeSut()

        jest.spyOn(chatRepository, "getChatByParticipants")
        .mockResolvedValue(true as any)

        const output = await sut.execute(props)

        expect(output.value).toBeInstanceOf(ChatAlreadyCreateError)
    })

    it("should return an error if chat creator is not found  ", async () => {
        const { sut, props, participantRepository } = makeSut()

        jest.spyOn(participantRepository, "findById")
        .mockResolvedValue(null)

        const output = await sut.execute(props)

        expect(output.value).toBeInstanceOf(CreatorNotFoundError)
    })

    it("should return an error if participant is not found  ", async () => {
        const { sut, props, participantRepository } = makeSut()
        jest.spyOn(participantRepository, "findById")
        .mockResolvedValueOnce(makeParticipant())

        jest.spyOn(participantRepository, "findById")
        .mockResolvedValueOnce(null)


        const output = await sut.execute(props)

        expect(output.value).toBeInstanceOf(ParticipantNotFoundError)
    })

    it("should call eventEmmiter once   ", async () => {
        const { sut, props, eventEmitter } = makeSut()

        await sut.execute(props)

        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

})