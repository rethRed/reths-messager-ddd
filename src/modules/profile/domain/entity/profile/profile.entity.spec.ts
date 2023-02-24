import { ProfileEntity } from "./profile.entity";

type SutTypes = {
    sut: ProfileEntity
    props: ProfileEntity.Props
}

const makeSut = (): SutTypes => {
    const props: ProfileEntity.Props = {

    }

    const sut = new ProfileEntity(props)

    return {
        sut,
        props
    }
}

describe("test profile Entity", () => {

    it("Should create an instance of profile entity", () => {
        const { props } = makeSut()
        
        const profile = new ProfileEntity(props);

        expect(profile).toBeInstanceOf(ProfileEntity);
        expect(profile.description).toBe(null)
        expect(profile.image).toBe(null)
    })
})