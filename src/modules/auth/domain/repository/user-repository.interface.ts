import { UserEntity } from "../entity";

export interface UserRepositoryInterface {
    save(user: UserEntity): Promise<void>
    findById(id: string): Promise<UserEntity>
    findByEmail(email: string): Promise<UserEntity>
    findByUsername(username: string): Promise<UserEntity>
}