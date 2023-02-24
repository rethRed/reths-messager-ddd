
export type UpdateProfileUsecaseInputDto = {
    profileId: string
    update: {
        image?: string
        description?: string
    }
}

export type UpdateProfileUsecaseOutputDto = null