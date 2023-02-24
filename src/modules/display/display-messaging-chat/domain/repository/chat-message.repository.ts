import { ChatMessageEntity } from "../entity";



export interface ChatMessageRepositoryInterface {
    list(userId: string, options: ChatMessageRepositoryInterface.findOptions): Promise<ChatMessageEntity[]>
}

export namespace ChatMessageRepositoryInterface {
    export type findOptions = {
        skip: number
        take: number
    }
}