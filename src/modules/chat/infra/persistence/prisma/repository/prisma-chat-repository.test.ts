import { inMemoryPrismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { ChatEntity, ParticipantEntity } from "@/modules/chat/domain/entity";
import { PrismaChatRepository } from "./prisma-chat-repository";

const mockChatEntity = (): ChatEntity => {
    const chatEntityOrError = ChatEntity.create({
        isGroupChat: false,
        groupName: null
    });
    if(chatEntityOrError.isLeft()) throw chatEntityOrError.value

    return chatEntityOrError.value;
}

const mockParticipant = (id: string): ParticipantEntity => {

    return new ParticipantEntity({
        username: "any"
    }, id)
}

const createDatabaseParticipant = async (id: string) => {
    await inMemoryPrismaClient.user.create({
        data: {
            id
        }
    })
}



type CreateChatTypes = {
  sut: PrismaChatRepository
}

const createChat = async (): Promise<CreateChatTypes> => {

    const sut = new PrismaChatRepository()

    return {
        sut
    }
}


describe("test chat-repository prisma integration", () => {
    
    beforeEach(async () => {
        await inMemoryPrismaClient.chat.deleteMany({})
        await inMemoryPrismaClient.user.deleteMany({})
    })
    
    afterAll(async () => {
        await inMemoryPrismaClient.chat.deleteMany({})
        await inMemoryPrismaClient.user.deleteMany({})
    })


    it("Should create a chat", async () => {
        const sut = new PrismaChatRepository()

        const chatEntity = mockChatEntity()

        const participant1 = mockParticipant("id_1")
        const participant2 = mockParticipant("id_2")

        await createDatabaseParticipant(participant1.id)
        await createDatabaseParticipant(participant2.id)

        chatEntity.addParticipant(participant1)
        chatEntity.addParticipant(participant2)

        await sut.create(chatEntity)

        const foundChat = await inMemoryPrismaClient.chat.findUnique({
            where: {
                id: chatEntity.id
            },
            include: {
                users: true
            }
        })

        expect(foundChat.id).toEqual(chatEntity.id)
        expect(foundChat.users[0].id).toBe("id_1")
        expect(foundChat.users[1].id).toBe("id_2")
    })


})
