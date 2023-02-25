import { UserEntity } from "@/modules/auth/domain/entity";
import { inMemoryPrismaClient } from "../client/in-memory-prisma-client";
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

afterAll(async () => {
    await inMemoryPrismaClient.$disconnect();
});

describe("test user-repository prisma integration", () => {

  // beforeEach(async () => {
  //   await inMemoryPrismaClient.$connect()
  // })

  it("Should save a user", async () => {
    const sut = new PrismaUserRepository(inMemoryPrismaClient)
    const user = mockUserEntity()
    await sut.save(user)
  })

})
