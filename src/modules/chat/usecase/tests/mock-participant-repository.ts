import {  ParticipantRepositoryInterface } from "../../domain/repository";

export const mockParticipantRepository = (): ParticipantRepositoryInterface => {
    return {
        create: jest.fn(),
        findById: jest.fn(),
    }
}