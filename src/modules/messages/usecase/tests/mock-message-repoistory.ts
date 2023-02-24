import {  MessageRepositoryInterface } from "../../domain/repository";

export const mockMessageRepository = (): MessageRepositoryInterface => {
    return {
        save: jest.fn(),
        findById: jest.fn(),
    }
}