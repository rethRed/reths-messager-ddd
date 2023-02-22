import { UserEntity } from "../entity";

export interface UserRepositoryInterface {
    save(user: UserEntity): Promise<void>
    findById(id: string): Promise<UserEntity | null>
    findByEmail(email: string): Promise<UserEntity | null>
    findByUsername(username: string): Promise<UserEntity | null>
}