import { AggregateRoot, BaseEntity } from "@/modules/@shared/domain"

export class AuthorEntity extends BaseEntity implements AggregateRoot {
    
    constructor(public props: AuthorEntity.Props, id?: string) {
        super(id)
    }

    get username(): string {
        return this.props.username
    }
}


export namespace AuthorEntity {
    
    export type Props = {
        username: string
    }

}