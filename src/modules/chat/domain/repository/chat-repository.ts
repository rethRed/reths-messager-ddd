import { ChatEntity } from "../entity";

export interface ChatRepositoryInterface {
    create(chat: ChatEntity): Promise<void>;
    findById(chat: ChatEntity): Promise<ChatEntity | null>
    getChatByParticipants(participantId1: string, participantId2: string): Promise<ChatEntity | null>
}