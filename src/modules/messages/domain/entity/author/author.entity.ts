import { BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";

export class AuthorEntity extends BaseEntity  {

    constructor(private props: AuthorEntity.Props, id: string) {
        super(id)
    }

    get name(): string {
        return this.props.name
    }

}

export namespace AuthorEntity {
    export type Props = {
        name: string
    } 
}