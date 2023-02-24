import { AuthorRepositoryInterface } from "../../domain/repository";

export const mockAuthorRepository = (): AuthorRepositoryInterface => {
    return {
        create: jest.fn(),
        findById: jest.fn(),
    }
}