import { MessageEntity } from "../entity";

export interface MessageRepositoryInterface {
    save(message: MessageEntity): Promise<void>;
    findById(messageId: string): Promise<MessageEntity | null>
}