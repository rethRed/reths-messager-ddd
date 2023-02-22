
import { Notification, ValueObject } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { EmailNotProvidedError, InvalidEmailError, InvalidEmailLengthError } from "./errors";

export class Email implements ValueObject{

  get value(): string {
    return this.email;
  }

  private constructor(
      private email: string, 
    ) {}

  static validate(email: string): Either<Error, null> {
    
    if(!email) {
      return left(new EmailNotProvidedError())
    }

    if (email.trim().length > 255) {
      return left(new InvalidEmailLengthError())
    }

    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(email)) {
      return left(new InvalidEmailError(email))
    }
    return right(null)
  }

  format() {
    this.email.trim().toLowerCase();
  }

  static create(email: string): Either<Error, Email> {
    const validateOutput = Email.validate(email);
    if (validateOutput.isLeft()) {
      return left(validateOutput.value);
    }
    const emailValueObject = new Email(email);
    emailValueObject.format()
    return right(emailValueObject)
  }

}