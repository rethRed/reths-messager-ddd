import { UsecaseInterface } from "@/modules/@shared/domain";
import { eventEmitterInterface } from "@/modules/@shared/event";
import { Either, left, right } from "@/modules/@shared/logic";
import { MessageEntity } from "../../domain/entity";
import { AuthorRepositoryInterface, ChatRepositoryInterface, MessageRepositoryInterface } from "../../domain/repository";
import { MessageSentEvent } from "../@event";
import { AuthorNotFoundError, ChatNotFoundError, UnauthorizedAuthorError } from "./errors";
import { SendMessageUsecaseInputDto, SendMessageUsecaseOutputDto } from "./send-message.usecase.dto";

export class SendMessageUsecase implements UsecaseInterface {

    constructor(
        private readonly authorRepository: AuthorRepositoryInterface,
        private readonly chatRepository: ChatRepositoryInterface,
        private readonly eventEmitter: eventEmitterInterface
    ) 
    {}

    async execute(input: SendMessageUsecaseInputDto): Promise<Either<Error, SendMessageUsecaseOutputDto>> {
        
        const author = await this.authorRepository.findById(input.authorId)
        if(!author) return left(new AuthorNotFoundError())

        const chat = await this.chatRepository.findById(input.chatId)
        if(!chat) return left(new ChatNotFoundError())

        if(!chat.isParticipant(author.id)){
            return left(new UnauthorizedAuthorError())
        }

        const messageOrError = MessageEntity.create({
            author,
            chat,
            content: input.content
        })
        if(messageOrError.isLeft()) return left(messageOrError.value)

        await this.eventEmitter.emit(new MessageSentEvent({
            id: messageOrError.value.id,
            authorId: messageOrError.value.author.id,
            chatId: messageOrError.value.chat.id,
            content: messageOrError.value.content
        }))

        return right(null)
    }
}