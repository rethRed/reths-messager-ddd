import { ProfileRepositoryInterface } from "../../domain/repository";

export const mockProfileRepository = (): ProfileRepositoryInterface => {
    return {
        updateProfile: jest.fn(),
        findById: jest.fn(),
    }
}