import { UsecaseInterface } from "@/modules/@shared/domain";
import { eventEmitterInterface } from "@/modules/@shared/event";
import { Either, left, right } from "@/modules/@shared/logic";
import { UserEntity } from "../../domain/entity";
import { UserRepositoryInterface } from "../../domain/repository";
import { UserSignedupEvent } from "../@event";
import { SignupEmailInUseError, SignupUsernameInUseError } from "./errors";
import { SignupUsecaseInputDto, SignupUsecaseOutputDto } from "./signup.usecase.dto";

export class SignupUsecase implements UsecaseInterface {

    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly eventEmitter: eventEmitterInterface
    ){}

    async execute(input: SignupUsecaseInputDto): Promise<Either<Error, SignupUsecaseOutputDto>> {
        
         const existingEmailUser = await this.userRepository.findByEmail(input.email)
        if(existingEmailUser){
            return left(new SignupEmailInUseError())
        }
        const existingUsernameUser = await this.userRepository.findByUsername(input.username)
        if(existingUsernameUser){
            return left(new SignupUsernameInUseError())
        }

        const userOrError = UserEntity.create(input)
        if(userOrError.isLeft()){
            return left(userOrError.value)
        }
        userOrError.value.encryptPassword()

        await this.eventEmitter.emit(new UserSignedupEvent({
            id: userOrError.value.id,
            username: userOrError.value.username,
            email: userOrError.value.email,
            password: userOrError.value.password,
            status: userOrError.value.status
        }))

        return right({
            id: userOrError.value.id,
            username: userOrError.value.username,
            email: userOrError.value.email,
            password: userOrError.value.password,
            status: userOrError.value.status
        })
    }
}