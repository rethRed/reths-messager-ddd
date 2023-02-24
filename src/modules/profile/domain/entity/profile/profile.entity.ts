import { AggregateRoot, BaseEntity } from "@/modules/@shared/domain"
import { Either, left, right } from "@/modules/@shared/logic"


export class ProfileEntity extends BaseEntity implements AggregateRoot {
    
    constructor(public props: ProfileEntity.Props, id?: string) {
        super(id)

        this.props = {
            image: props.image ?? null,
            description: props.description?? null
        }
    }

    changeImage(newImage: string): void {
        this.props.image = newImage
    }
    
    changeDescription(newDescription: string): void {
        this.props.description = newDescription
    }

    get image(): string {
        return this.props.image
    }
    
    get description(): string {
        return this.props.description
    }
}


export namespace ProfileEntity {
    

    export type Props = {
        image?: string | null
        description?: string | null
    }

}