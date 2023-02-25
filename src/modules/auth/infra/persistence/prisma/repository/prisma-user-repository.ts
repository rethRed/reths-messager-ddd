import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { UserEntity } from "@/modules/auth/domain/entity";
import { UserRepositoryInterface } from "@/modules/auth/domain/repository";
import { UserEntityMapper } from "../../../mappers";


export class PrismaUserRepository implements UserRepositoryInterface {

    async save(user: UserEntity): Promise<void> {
        await prismaClient.user.create({
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                password: user.password,
                status: user.status,
            }
        })
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await prismaClient.user.findUnique({
            where: {
                email
            }
        })
        if(!user){
            return null
        }
        return UserEntityMapper.toDomain({
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            status: user.status,
        })
    }

    async findById(id: string): Promise<UserEntity | null> {
        const user = await prismaClient.user.findUnique({
            where: {
                id
            }
        })
        if(!user){
            return null
        }
        return UserEntityMapper.toDomain({
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            status: user.status,
        })
    }

    async findByUsername(username: string): Promise<UserEntity | null> {
        const user = await prismaClient.user.findUnique({
            where: {
                username
            }
        })
        if(!user){
            return null
        }
        return UserEntityMapper.toDomain({
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            status: user.status,
        })
    }
}