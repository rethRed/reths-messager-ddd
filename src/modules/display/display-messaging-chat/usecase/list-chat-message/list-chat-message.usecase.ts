import { UsecaseInterface } from "@/modules/@shared/domain"
import { Either, left, right } from "@/modules/@shared/logic"
import { ChatMessageRepositoryInterface } from "../../domain/repository"
import { ListChatMessageUsecaseInputDto, ListChatMessageUsecaseOutputDto } from "./list-chat-message.usecase.dto"


export class ListChatMessageUsecase implements UsecaseInterface {

    constructor(
        private readonly chatMessageRepository: ChatMessageRepositoryInterface
    ) {}

    async execute(input: ListChatMessageUsecaseInputDto): Promise<Either<Error, ListChatMessageUsecaseOutputDto>> {
        
        const chatMessages = await this.chatMessageRepository.list(input.userId, {
            skip: input.options.skip,
            take: 15
        })

        return right({
            chat: chatMessages.map(message => ({
                id: message.id,                         
                chatName: message.chatName,              
                chatImage: message.chatImage,           
            }))                                 
        })                                              
    }
}