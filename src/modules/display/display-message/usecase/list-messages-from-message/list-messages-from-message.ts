import { UsecaseInterface } from "@/modules/@shared/domain"
import { Either, left, right } from "@/modules/@shared/logic"
import { MessageRepositoryInterface } from "../../domain/repository"
import { MessageOutputDto } from "../../protocol"
import { ListMessagesFromMessageUsecaseInputDto } from "./list-messages-from-message.dto"

export class ListMessagesFromMessageUsecase implements UsecaseInterface {

    constructor(
        private readonly messageRepository: MessageRepositoryInterface
    ) {}

    async execute(input: ListMessagesFromMessageUsecaseInputDto): Promise<Either<Error, MessageOutputDto[]>> {

        const messsages = await this.messageRepository.listMessagesFromMessageId(input.messageId, {
            take: 20
        })

        return right(messsages.map(message => ({
            content: message.content,
            author: {
                id: message.author.id,
                username: message.author.username
            },
            dateTimeSent: message.dateTimeSent
        })))                                              
    }
}