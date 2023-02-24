import {  ParticipantEntity } from "../entity";

export interface ParticipantRepositoryInterface {
    create(participant: ParticipantEntity): Promise<void>;
    findById(id: string): Promise<ParticipantEntity | null>
}