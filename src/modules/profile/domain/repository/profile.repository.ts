import { ProfileEntity } from "../entity";

export interface ProfileRepositoryInterface {
    updateProfile(profile: ProfileEntity): Promise<void>
    findById(id: string): Promise<ProfileEntity | null>
}