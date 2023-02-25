import { MessageRepositoryInterface } from "../../domain/repository"

export const mockMessageRepository = (): MessageRepositoryInterface => {
    return {
        listLastMessages: jest.fn(),
        listMessagesFromMessageId: jest.fn()
    }
}