import { describe } from "node:test"
import { EmailNotProvidedError, InvalidEmailLengthError, InvalidPasswordLengthError, PasswordNotProvidedError } from "../../value-object"
import { UsernameNotProvidedError } from "./errors"
import { UserEntity } from "./user.entity"

type SutTypes = {
    sut: UserEntity
    props: UserEntity.Input
}

const makeSut = (newProps?: UserEntity.Input): SutTypes => {
    const props: UserEntity.Input = {
        username: "any_username",
        password: "any_password",
        email: "any_email@mail.com",
    }
    const sut = UserEntity.create(newProps? newProps : props)

    if(sut.isLeft()){
        throw sut.value
    }

    return { 
        sut: sut.value,
         props 
    }
}

describe("test userEntity", () => {

    it("Should create a user entity with correct values", () => {
        const { props } = makeSut()

        const sut = UserEntity.create(props, "any_id")

        if(sut.isLeft()){
            throw sut.value
        }
        expect(sut.value.id).toBe("any_id")
        expect(sut.value.username).toBe(props.username)
        expect(sut.value.password).toBe(props.password)
        expect(sut.value.email).toBe(props.email)
        expect(sut.value.status).toBe("ACTIVE")
    })

    it("Should ban a user", () => {
        const { sut, props } = makeSut()
        sut.ban()
        expect(sut.status).toBe("BANNED")
    })

    it("Should activate a user", () => {
        const { sut, props } = makeSut()
        sut.ban()
        expect(sut.status).toBe("BANNED")
        sut.activate()
        expect(sut.status).toBe("ACTIVE")
    })

    it("Should return an error if username is not provided", () => {
        const { props } = makeSut()

        const sut = UserEntity.create({
            ...props,
            username: ""
        })
        expect(sut.value).toBeInstanceOf(UsernameNotProvidedError)
    })

    it("Should return an error if email is not provided", () => {
        const { props } = makeSut()

        const sut = UserEntity.create({
            ...props,
            email: ""
        })
        expect(sut.value).toBeInstanceOf(EmailNotProvidedError)
    })

    it("Should return an error if an invalid email length in provided", () => {
        const { props } = makeSut()

        const sut = UserEntity.create({
            ...props,
            email: "a".repeat(256)
        })
        expect(sut.value).toBeInstanceOf(InvalidEmailLengthError)
    })

    it("Should return an error if password is not provided", () => {
        const { props } = makeSut()

        const sut = UserEntity.create({
            ...props,
            password: ""
        })
        expect(sut.value).toBeInstanceOf(PasswordNotProvidedError)
    })

    it("Should return an error if an invalid password length in provided", () => {
        const { props } = makeSut()

        const sut = UserEntity.create({
            ...props,
            password: "a".repeat(256)
        })
        expect(sut.value).toBeInstanceOf(InvalidPasswordLengthError)
    })

    it("Should encrypt a password", async () => {
        const { sut } = makeSut()
        expect(sut.password).toBe("any_password")
        await sut.encryptPassword()
        expect(sut.password).not.toBe("any_password")
        expect(sut.password).toBeDefined()
    })

    it("Should compare a password", async () => {
        const { sut } = makeSut()
        await sut.encryptPassword()
        const result = await sut.comparePassword("any_password")
        expect(result).toBe(true)
    })

})