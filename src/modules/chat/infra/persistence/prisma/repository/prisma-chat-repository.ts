import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { ChatEntity } from "@/modules/chat/domain/entity";
import { ChatRepositoryInterface } from "@/modules/chat/domain/repository";

export class PrismaChatRepository implements ChatRepositoryInterface {

    async create(chat: ChatEntity): Promise<void> {
        await prismaClient.chat.create({
            data: {
                id: chat.id,
                isGroupChat: chat.isGroupChat(),
                groupName: chat.groupName,
                users: {
                    connect: chat.getParticipants().map(participant => ({ 
                            id: participant.id 
                        }) 
                    ),
                }
            }
        })
    }

    async findById(chat: ChatEntity): Promise<ChatEntity> {
        throw new Error("Not implemented")
    }

    async getChatByParticipants(participantId1: string, participantId2: string): Promise<ChatEntity> {
        throw new Error("Not implemented")
    }
}