import { eventEmitterInterface } from "@/modules/@shared/event"
import { mockEventEmiter } from "@/modules/@shared/tests"
import { ProfileEntity } from "../../domain/entity"
import { ProfileRepositoryInterface } from "../../domain/repository"
import { mockProfileRepository } from "../tests"
import { ProfileNotFoundError } from "./errors"
import { UpdateProfileUsecase } from "./update-profile.usecase"
import { UpdateProfileUsecaseInputDto } from "./update-profile.usecase.dto"

const makeProfileEntity = (): ProfileEntity => {
    return new ProfileEntity({
        description: "any_description",
        image: "any_image",
    })
}

type SutTypes = {
    sut: UpdateProfileUsecase
    props: UpdateProfileUsecaseInputDto
    profileRepository: ProfileRepositoryInterface
    eventEmitter: eventEmitterInterface
    profileEntity: ProfileEntity
}

const makeSut = (): SutTypes => {
    const props: UpdateProfileUsecaseInputDto = {
        profileId: "any_profile_id",
        update: {

        }
    }

    const profileEntity = makeProfileEntity() 
    const profileRepository = mockProfileRepository()
    jest.spyOn(profileRepository, "findById")
    .mockResolvedValue(profileEntity)
    const eventEmitter = mockEventEmiter()
    const sut = new UpdateProfileUsecase(profileRepository, eventEmitter)

    return { 
        sut, 
        props,
        profileRepository,
        eventEmitter,
        profileEntity
    }
}


describe("test updateProfileUsecase",  () => {
    it("Should return right ", async () => {
        const { sut, props } = makeSut()

        const output = await sut.execute(props)

        expect(output.isRight()).toBe(true)
    })

    it("Should return an error if a profile is not found ", async () => {
        const { sut, props, profileRepository } = makeSut()
        jest.spyOn(profileRepository, "findById")
        .mockResolvedValue(null)

        const output = await sut.execute(props)

        expect(output.value).toBeInstanceOf(ProfileNotFoundError)
    })

    it("Should call profileRepository.updateProfile once", async () => {
        const { sut, props, profileRepository } = makeSut()

        await sut.execute(props)

        expect(profileRepository.updateProfile).toHaveBeenCalledTimes(1)
    })

    it("Should update the profile entity", async () => {
        const { sut, props, profileEntity } = makeSut()

        expect(profileEntity.image).toBe("any_image")
        expect(profileEntity.description).toBe("any_description")

        await sut.execute({
            ...props,
            update: {
                ...props.update,
                image: "new_image",
                description: "new_description"
            }
        })

        expect(profileEntity.image).toBe("new_image")
        expect(profileEntity.description).toBe("new_description")
    })

    it("Should call eventEmmiter once once", async () => {
        const { sut, props, eventEmitter } = makeSut()

        await sut.execute(props)

        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })
})