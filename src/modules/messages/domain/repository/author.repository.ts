import { AuthorEntity } from "../entity";

export interface AuthorRepositoryInterface {
    create(author: AuthorEntity): Promise<void>;
    findById(authorId: string): Promise<AuthorEntity | null>
}