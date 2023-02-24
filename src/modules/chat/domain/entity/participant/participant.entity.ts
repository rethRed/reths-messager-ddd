import { BaseEntity } from "@/modules/@shared/domain";

export class ParticipantEntity extends BaseEntity {

    constructor(private props: ParticipantEntity.Props, id: string) {
        super(id)
    }

    get username(): string {
        return this.props.username
    }
}

export namespace ParticipantEntity {
    export type Props = {
        username: string
    } 
}