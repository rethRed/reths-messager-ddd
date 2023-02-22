
export type SignupUsecaseInputDto = {
    username: string
    email: string,
    password: string
}

export type SignupUsecaseOutputDto = {
    id: string
    username: string
    email: string,
    password: string
    status: string
}
