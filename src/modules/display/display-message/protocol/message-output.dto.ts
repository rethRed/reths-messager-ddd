export type MessageOutputDto = {
    content: string,
    author: {
        id: string,
        username: string
    },
    dateTimeSent: Date
}