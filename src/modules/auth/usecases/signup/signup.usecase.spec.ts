import { eventEmitterInterface } from "@/modules/@shared/event"
import { UserRepositoryInterface } from "../../domain/repository"
import { mockUserRepository } from "../test"
import { mockEventEmiter } from "../test/mockEventEmiter"
import { SignupEmailInUseError, SignupUsernameInUseError } from "./errors"
import { SignupUsecase } from "./signup.usecase"
import { SignupUsecaseInputDto } from "./signup.usecase.dto"


type SutTypes = {
    sut: SignupUsecase
    userRepository: UserRepositoryInterface
    props: SignupUsecaseInputDto
    eventEmiter: eventEmitterInterface
}

const makeSut = (): SutTypes => {

    const userRepository =  mockUserRepository();
    const eventEmiter = mockEventEmiter()
    const sut = new SignupUsecase(userRepository, eventEmiter);
    const props: SignupUsecaseInputDto = {
        username: "any_username",
        email: "any_mail@gmail.com",
        password: "any_password"
    }

    jest.spyOn(userRepository, "findByEmail")
    .mockResolvedValue(null)

    jest.spyOn(userRepository, "findByUsername")
    .mockResolvedValue(null)

    return {
        sut,
        userRepository,
        props,
        eventEmiter
    }
}


describe("test signupUsecase", () => {
    it("Should return with correct values", async () => {
        const { props, sut } = makeSut()

        const output = await sut.execute(props)

        if(output.isLeft()){
            throw output.value
        }

        expect(output.value.id).toBeDefined()
        expect(output.value.email).toBe(props.email)
        expect(output.value.username).toBe(props.username)
    })


})