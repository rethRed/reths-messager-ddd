import { AggregateRoot, BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { Email, Password } from "../../value-object";
import { InvalidUsernameLengthError, UsernameNotProvidedError } from "./errors";

export class UserEntity extends BaseEntity implements AggregateRoot {


    
    private constructor(public props: UserEntity.Props, id?: string) {
        super(id)
    }

    static create(input: UserEntity.Input, id?: string): UserEntity.Output {

        const emailOrError = Email.create(input.email)
        if(emailOrError.isLeft()){
            return left(emailOrError.value)
        }
        const passwordOrError = Password.create(input.password)
        if(passwordOrError.isLeft()){
            return left(passwordOrError.value)
        }
        const userEntity = new UserEntity({
            username: input.username,
            email: emailOrError.value,
            password: passwordOrError.value,
            status: "ACTIVE"
        }, id)

        const validate = userEntity.validate()
        if(validate.isLeft()){
            return left(validate.value)
        }
        return right(userEntity)
    }

    private validate(): Either<Error, null>{
        if(!this.username.trim()){
            return left(new UsernameNotProvidedError())
        }
        if(this.username.trim().length > 60){
            return left(new InvalidUsernameLengthError())
        }
        return right(null)
    }

    activate(){
        this.props.status = "ACTIVE"
    }
    ban(){
        this.props.status = "BANNED"
    }

    async encryptPassword(): Promise<void>{
        await this.props.password.encrypt()
    }

    async comparePassword(unHashedpassword: string): Promise<boolean>{
        return await this.props.password.compare(unHashedpassword)
    }


    get username(): string {
        return this.props.username
    }
    get password(): string {
        return this.props.password.value
    }
    get email(): string {
        return this.props.email.value
    }
    get status(): string {
        return this.props.status
    }
}


export namespace UserEntity {
    
    export type Status = "BANNED" | "ACTIVE"

    export type Props = {
        username: string
        email: Email
        password: Password
        status: Status
    }

    export type Input = {
        username: string
        email: string
        password: string
    }

    export type Output = Either<Error, UserEntity>
}