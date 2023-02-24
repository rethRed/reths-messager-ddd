import { AggregateRoot, BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";

export class MessageEntity extends BaseEntity implements AggregateRoot {


    
    private constructor(public props: UserEntity.Props, id?: string) {
        super(id)
    }

    static create(input: UserEntity.Input, id?: string): UserEntity.Output {

        const messageEntity = new MessageEntity({
            
        }, id)

        const validate = messageEntity.validate()
        if(validate.isLeft()){
            return left(validate.value)
        }
        return right(messageEntity)
    }

    private validate(): Either<Error, null>{


        return right(null)
    }



}


export namespace UserEntity {
    

    export type Props = {

    }

    export type Input = {

    }

    export type Output = Either<Error, MessageEntity>
}