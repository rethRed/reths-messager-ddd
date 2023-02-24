import { UsecaseInterface } from "@/modules/@shared/domain"
import { Either, left, right } from "@/modules/@shared/logic"
import { ListChatMessageUsecaseInputDto, ListChatMessageUsecaseOutputDto } from "./list-chat-message.usecase.dto"


export class ListChatMessageUsecase implements UsecaseInterface {

    constructor(
    ) 
    {}

    async execute(input: ListChatMessageUsecaseInputDto): Promise<Either<Error, ListChatMessageUsecaseOutputDto>> {
        
        

        return right(null)
    }
}