
export type ListChatMessageUsecaseInputDto = {
    userId: string
    options: {
        skip: number
    }
}

export type ListChatMessageUsecaseOutputDto = {
    chat: {
        id: string
        chatName: string
        chatImage: string
    }[]
}