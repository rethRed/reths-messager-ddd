import { ChatEntity } from "../entity";

export interface ChatRepositoryInterface {
    create(chat: ChatEntity): Promise<void>;
    findById(chatId: string): Promise<ChatEntity | null>
}