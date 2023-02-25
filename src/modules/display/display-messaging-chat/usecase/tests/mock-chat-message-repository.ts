import { ChatMessageRepositoryInterface } from "../../domain/repository"

export const mockChatMessageRepository = (): ChatMessageRepositoryInterface => {
    return {
        list: jest.fn()
    }
}