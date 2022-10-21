import { AppError } from "../../../../shared/errors/AppError"
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "./CreateUserUseCase"


let inMemoryUsersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

describe("Create new User", () => {

  beforeEach(()=>{
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase  = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
        email: "email@example.com",
        name: "userTest",
        password: "passwordTest",
    })
    expect(user).toHaveProperty("id")
  })

  it("should not be able to create a new user with same email", async () => {
expect(async ()=>{
   await createUserUseCase.execute({
    email: "email1@example.com",
    name: "userTest",
    password: "passwordTest",
})

 await createUserUseCase.execute({
  email: "email1@example.com",
  name: "userTest",
  password: "passwordTest"})
}).rejects.toBeInstanceOf(AppError)
  })


})
