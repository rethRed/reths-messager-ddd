import { UserEntity } from "@/modules/auth/domain/entity";
import { UserRepositoryInterface } from "@/modules/auth/domain/repository";
import { PrismaClient } from "@prisma/client";

export class PrismaUserRepository implements UserRepositoryInterface {

    constructor(private readonly prismaClient: PrismaClient) {}

    async save(user: UserEntity): Promise<void> {
        await this.prismaClient.user.create({
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                password: user.password,
                status: user.status,
            }
        })
    }

    async findByEmail(email: string): Promise<UserEntity> {
        throw new Error("Not implemented")
    }

    async findById(id: string): Promise<UserEntity> {
        throw new Error("Not implemented")
    }

    async findByUsername(username: string): Promise<UserEntity> {
        throw new Error("Not implemented")
    }
}