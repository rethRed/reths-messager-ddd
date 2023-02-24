import { ChatRepositoryInterface } from "../../domain/repository";

export const mockChatRepository = (): ChatRepositoryInterface => {
    return {
        create: jest.fn(),
        findById: jest.fn(),
        getChatByParticipants: jest.fn(),
    }
}