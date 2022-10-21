
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let showUserProfileUseCase: ShowUserProfileUseCase
let authenticateUserUseCase: AuthenticateUserUseCase



describe("Show user Profile", () => {

  beforeEach(()=>{
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository)
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository)
  })

  it("should be able to show user profile", async  () => {



   const  user = await createUserUseCase.execute({
      email: "email@example.com",
      password:  "password",
      name: "user",
      })

      const profile = await showUserProfileUseCase.execute(user.id as string)

      expect(profile).toHaveProperty("id")
      expect(profile).toHaveProperty("email")
      expect(profile).toHaveProperty("password")
      expect(profile).toHaveProperty("name")

  })

})
