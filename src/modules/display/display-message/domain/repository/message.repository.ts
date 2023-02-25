import { MessageEntity } from "../entity";

export interface MessageRepositoryInterface {
    listLastMessages(chatId: string, options: { take: number }): Promise<MessageEntity[]>
    listMessagesFromMessageId(messageId: string, options: { take: number }): Promise<MessageEntity[]>
}