import { UserRepositoryInterface } from "../../domain/repository"


export const mockUserRepository = (): UserRepositoryInterface => {
    return {
        save: jest.fn(),
        findByEmail: jest.fn(),
        findByUsername: jest.fn(),
        findById: jest.fn(),
    }
}