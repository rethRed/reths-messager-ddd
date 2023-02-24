import { UsecaseInterface } from "@/modules/@shared/domain"
import { eventEmitterInterface } from "@/modules/@shared/event"
import { Either, left, right } from "@/modules/@shared/logic"
import { ProfileRepositoryInterface } from "../../domain/repository"
import { ProfileUpdatedEvent } from "../@event"
import { ProfileNotFoundError } from "./errors"
import { UpdateProfileUsecaseInputDto, UpdateProfileUsecaseOutputDto } from "./update-profile.usecase.dto"

export class UpdateProfileUsecase implements UsecaseInterface {

    constructor(
        private readonly profileRepository: ProfileRepositoryInterface,
        private readonly eventEmitter: eventEmitterInterface
    ) 
    {}

    async execute(input: UpdateProfileUsecaseInputDto): Promise<Either<Error, UpdateProfileUsecaseOutputDto>> {

        const profile = await this.profileRepository.findById(input.profileId)
        if (!profile) {
            return left(new ProfileNotFoundError())
        }

        if(input.update.description){
            profile.changeDescription(input.update.description)
        }
        if(input.update.image){
            profile.changeImage(input.update.image)
        }

        await this.profileRepository.updateProfile(profile)

        await this.eventEmitter.emit(new ProfileUpdatedEvent({
            id: profile.id,
            description: profile.description,
            image: profile.image,
        }))

        return right(null)
    }
}