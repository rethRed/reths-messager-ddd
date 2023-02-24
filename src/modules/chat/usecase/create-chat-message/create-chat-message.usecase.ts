import { UsecaseInterface } from "@/modules/@shared/domain"
import { eventEmitterInterface } from "@/modules/@shared/event"
import { Either, left, right } from "@/modules/@shared/logic"
import { ChatEntity } from "../../domain/entity"
import { ChatRepositoryInterface, ParticipantRepositoryInterface } from "../../domain/repository"
import { ChatMessageCreatedEvent } from "../@event"
import { CreateChatMessageUsecaseInputDto, CreateChatMessageUsecaseOutputDto } from "./create-chat-message.usecase.dto"
import { ChatAlreadyCreateError, CreatorNotFoundError, ParticipantNotFoundError } from "./errors"


export class CreateChatMessageUsecase implements UsecaseInterface {

    constructor(
        private readonly chatRepository: ChatRepositoryInterface,
        private readonly participantRepository: ParticipantRepositoryInterface,
        private readonly eventEmitter: eventEmitterInterface
    ) 
    {}

    async execute(input: CreateChatMessageUsecaseInputDto): Promise<Either<Error, CreateChatMessageUsecaseOutputDto>> {
        
        const chat = await this.chatRepository.getChatByParticipants(input.creatorId, input.participantId)
        if(chat) return left(new ChatAlreadyCreateError())

        const chatCreator = await this.participantRepository.findById(input.creatorId)
        if(!chatCreator) return left(new CreatorNotFoundError())

        const chatParticipant = await this.participantRepository.findById(input.participantId)
        if(!chatParticipant) return left(new ParticipantNotFoundError())


        const chatEntityOrError = ChatEntity.create({
            isGroupChat: false,
            groupName: null
        })
        if(chatEntityOrError.isLeft()) return left(chatEntityOrError.value)

        chatEntityOrError.value.addParticipant(chatCreator)
        chatEntityOrError.value.addParticipant(chatParticipant)

        await this.eventEmitter.emit(new ChatMessageCreatedEvent({
            id: chatEntityOrError.value.id,
            creatorId: chatCreator.id,
            participantId: chatParticipant.id
        }))

        return right(null)
    }
}