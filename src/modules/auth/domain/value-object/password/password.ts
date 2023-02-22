import { ValueObject, Notification } from "@/modules/@shared/domain";
import { InvalidPasswordLengthError, PasswordNotProvidedError } from "./errors";
import { EncrypterFactory } from "./encrypter";
import { Either, left, right } from "@/modules/@shared/logic";

export class Password implements ValueObject {

    get value(): string { 
        return this.password
    }

    constructor(
        private password: string, 
      ) {}

    async encrypt(): Promise<void> {
        const encrypter = EncrypterFactory.create()
        this.password = await encrypter.encrypt(this.password)
    }

    async compare(unHashedpassword: string): Promise<boolean> {
        const encrypter = EncrypterFactory.create()
        return await encrypter.compare( unHashedpassword, this.password)
    }

    static validate(password: string): Either<Error, null> {
        if(!password){
            return left(new PasswordNotProvidedError())
        }

        if (password.trim().length > 255) {
            return left(new InvalidPasswordLengthError())
        }
        return right(null)
    }

    format() {
        this.password.trim()
    }

    static create(password: string): Either<Error, Password> {
        const validateOutput = Password.validate(password);
        if (validateOutput.isLeft()) {
          return left(validateOutput.value);
        }
        const passwordValueObject = new Password(password);
        passwordValueObject.format()
        return right(passwordValueObject)
      }

}