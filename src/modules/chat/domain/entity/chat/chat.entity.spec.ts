import { ParticipantEntity } from "../participant/participant.entity"
import { ChatEntity } from "./chat.entity"
import { ParticipantsAllowedExceededError } from "./errors"

const makeParticipant = (id?: string): ParticipantEntity => {
    return new ParticipantEntity({username: "any_username"}, id ?? "any_id")
}

type SutTypes = {
    sut: ChatEntity
    props: ChatEntity.Input
}

const makeSut = (): SutTypes => {

    const props: ChatEntity.Input = {
        isGroupChat: false,
        groupName: null
    }

    const sut = ChatEntity.create(props)

    if(sut.isLeft()) throw sut.value

    return { 
        sut: sut.value, 
        props 
    }
}

describe("test chatEntity", () => {

    it("Should create a ChatEntity", () => {
        const { props } = makeSut()

        const sut = ChatEntity.create(props)

        if(sut.isLeft()) throw sut.value

        expect(sut.value).toBeInstanceOf(ChatEntity)
        expect(sut.value.getParticipants()).toEqual([])
        expect(sut.value.isGroupChat()).toEqual(false)
    })

    it("Should add a participant", () => {
        const { props, sut } = makeSut()

        expect(sut.getParticipants()).toEqual([])

        const participant1 = makeParticipant("any_id_1")
        const participant2 = makeParticipant("any_id_2")

        sut.addParticipant(participant1)
        expect(sut.getParticipants()).toEqual([participant1])
        sut.addParticipant(participant2)
        expect(sut.getParticipants()).toEqual([participant1, participant2])
    })

    it("Should return an error if the chat is not a group and exceededs the number of participants ", () => {
        const { props } = makeSut()

        const sut = ChatEntity.create({
            ...props,
            isGroupChat: false,
        })
        if(sut.isLeft()) throw sut.value

        expect(sut.value.isGroupChat()).toEqual(false)
        expect(sut.value.getParticipants()).toEqual([])

        const participant1 = makeParticipant("any_id_1")
        const participant2 = makeParticipant("any_id_2")
        const participant3 = makeParticipant("any_id_3")

        sut.value.addParticipant(participant1)
        sut.value.addParticipant(participant2)
        expect(sut.value.getParticipants()).toEqual([participant1, participant2])

        const output = sut.value.addParticipant(participant3)
        expect(output.value).toBeInstanceOf(ParticipantsAllowedExceededError)
        expect(sut.value.getParticipants()).toEqual([participant1, participant2])
    })

    it("Should allow multiple participants if the chat is a group", () => {
        const { props } = makeSut()

        const sut = ChatEntity.create({
            ...props,
            isGroupChat: true,
            groupName: "any_group_name"
        })
        if(sut.isLeft()) throw sut.value

        const participant1 = makeParticipant("any_id_1")
        const participant2 = makeParticipant("any_id_2")
        const participant3 = makeParticipant("any_id_3")
        const participant4 = makeParticipant("any_id_4")

        sut.value.addParticipant(participant1)
        sut.value.addParticipant(participant2)
        sut.value.addParticipant(participant3)
        sut.value.addParticipant(participant4)

        expect(sut.value.getParticipants()).toEqual([participant1, participant2, participant3, participant4])

    })

    it("Should change the group name", () => {
        const { props } = makeSut()

        const sut = ChatEntity.create({
            ...props,
            isGroupChat: true,
            groupName: "any_group_name"
        })
        if(sut.isLeft()) throw sut.value

        expect(sut.value.groupName).toBe("any_group_name")

        sut.value.changeGroupName("new_group_name")

        expect(sut.value.groupName).toBe("new_group_name")
    })
})