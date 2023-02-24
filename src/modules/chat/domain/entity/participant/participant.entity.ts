import { BaseEntity } from "@/modules/@shared/domain";

export class Participant extends BaseEntity {

    constructor(private props: Participant.Props, id: string) {
        super(id)
    }

    get username(): string {
        return this.props.username
    }
}

export namespace Participant {
    export type Props = {
        username: string
    } 
}