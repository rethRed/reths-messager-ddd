import { UsecaseInterface } from "@/modules/@shared/domain"
import { Either, left, right } from "@/modules/@shared/logic"
import { MessageRepositoryInterface } from "../../domain/repository"
import { MessageOutputDto } from "../../protocol"
import { ListLastMessagesUsecaseInputDto } from "./list-last-messages.usecase.dto"

export class ListLastMessagesUsecase implements UsecaseInterface {

    constructor(
        private readonly messageRepository: MessageRepositoryInterface
    ) {}

    async execute(input: ListLastMessagesUsecaseInputDto): Promise<Either<Error, MessageOutputDto[]>> {

        const messsages = await this.messageRepository.listLastMessages(input.chatId, {
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