import { AppError } from "../../../../shared/errors/AppError"
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { ICreateUserDTO } from "../createUser/ICreateUserDTO"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"


let inMemoryUsersRepository: InMemoryUsersRepository
let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {

  beforeEach(()=>{
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository)
  })

  it("should authenticate user and create a session", async () => {
    const user: ICreateUserDTO ={
    email: "email@example.com",
    password:  "password",
    name: "user",
    }

  await createUserUseCase.execute(user)



    const userAuthenticated = await authenticateUserUseCase.execute(
      {
        email: user.email,
        password: user.password,
      }
    )

  expect(userAuthenticated).toHaveProperty("token")
  })



  it("should not be able to authenticate user with incorrect password or email", async () => {
    expect(async()=>{
      const user =  await createUserUseCase.execute({
        email: "test@example.com",
        name: "UserTest",
        password: "testpassword"
      })
      const userAuthenticated = await authenticateUserUseCase.execute({
        email: "UserTest132",
        password: user.password
      })

    }).rejects.toBeInstanceOf(AppError)

   })



}
)
