import { inMemoryPrismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { UserEntity } from "@/modules/auth/domain/entity";

import { PrismaUserRepository } from "./prisma-user-repository";

const mockUserEntity = (): UserEntity => {
  const userEntityOrError = UserEntity.create({
    username: "any_username",
    email: "any_mail@mail.com",
    password: "any_password",
  })

  if(userEntityOrError.isLeft()) throw userEntityOrError.value

  return userEntityOrError.value
}

type CreateUserTypes = {
  userEntity: UserEntity
  sut: PrismaUserRepository
}

const createUser = async (): Promise<CreateUserTypes> => {

  const sut = new PrismaUserRepository()
  const userEntity = mockUserEntity()
  await sut.save(userEntity)

  return {
    userEntity,
    sut
  }
}


describe("test user-repository prisma integration", () => {

  beforeEach(async () => {
    await inMemoryPrismaClient.user.deleteMany({})
  })

  it("Should save a user", async () => {
    const sut = new PrismaUserRepository()
    const user = mockUserEntity()
    await sut.save(user)

    const foundUser = await inMemoryPrismaClient.user.findUnique({
      where: { id: user.id}
    })

    expect(foundUser.id).toEqual(user.id)
    expect(foundUser.username).toEqual(user.username)
    expect(foundUser.email).toEqual(user.email)
    expect(foundUser.password).toEqual(user.password)
    expect(foundUser.status).toEqual(user.status)
  })

  it("Should find UserByEmail", async () => {
    const { userEntity, sut } = await createUser()

    const foundUser = await sut.findByEmail(userEntity.email)

    expect(foundUser.id).toEqual(userEntity.id)
  })

  it("Should return null if a user was not found by email ", async () => {
    const sut = new PrismaUserRepository()

    const foundUser = await sut.findByEmail("any_mail@mail.com")

    expect(foundUser).toBe(null)
  })

  it("Should find id", async () => {
    const { userEntity, sut } = await createUser()

    const foundUser = await sut.findById(userEntity.id)

    expect(foundUser.id).toEqual(userEntity.id)
  })

  it("Should return null if a user was not found by id ", async () => {
    const sut = new PrismaUserRepository()

    const foundUser = await sut.findByEmail("any_id")

    expect(foundUser).toBe(null)
  })

  it("Should find by username", async () => {
    const { userEntity, sut } = await createUser()

    const foundUser = await sut.findByUsername(userEntity.username)

    expect(foundUser.id).toEqual(userEntity.id)
  })

  it("Should return null if a user was not found by username ", async () => {
    const sut = new PrismaUserRepository()

    const foundUser = await sut.findByUsername("any_username")

    expect(foundUser).toBe(null)
  })


})
