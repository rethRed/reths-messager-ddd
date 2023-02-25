import { UserEntity } from "../../domain/entity";

export class UserEntityMapper {

    static toDomain(model: UserEntityMapper.toDomainProps): UserEntity{
        const userOrError = UserEntity.create({
            username: model.username,
            email: model.email,
            password: model.password,
        }, model.id)

        if(userOrError.isLeft()) throw userOrError.value
        
        if(userOrError.value.status === "BANNED"){
            userOrError.value.ban()
        }
        return userOrError.value
    }
}

export namespace UserEntityMapper{
    export type toDomainProps = {
        id: string
        username: string
        email: string
        password: string
        status: string
    }
}