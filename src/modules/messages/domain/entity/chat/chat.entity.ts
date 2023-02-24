import { BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";

export class ChatEntity extends BaseEntity  {

    private constructor(public props: UserEntity.Props, id?: string) {
        super(id)
    }

    static create(input: UserEntity.Input, id?: string): ChatEntity {

        return new ChatEntity({
            
        }, id)
    }

}


export namespace UserEntity {
    

    export type Props = {

    }

    export type Input = {
        
    }
}