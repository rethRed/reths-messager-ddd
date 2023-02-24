import { BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";

export class ChatEntity extends BaseEntity  {

    constructor(props: {}, id: string) {
        super(id)
    }

}
