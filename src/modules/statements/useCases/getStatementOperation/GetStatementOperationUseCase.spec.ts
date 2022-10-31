import { AppError } from "../../../../shared/errors/AppError"
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase"
import { OperationType } from "../../entities/Statement"
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository"
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase"
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase"



let inMemoryStatementsRepository: InMemoryStatementsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let createStatementUseCase: CreateStatementUseCase
let getStatementOperationUseCase: GetStatementOperationUseCase



describe("Get Statement Operation", ()=>{
  beforeEach(()=>{

    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryStatementsRepository = new InMemoryStatementsRepository()

    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository,inMemoryStatementsRepository)


    getStatementOperationUseCase = new GetStatementOperationUseCase(inMemoryUsersRepository,inMemoryStatementsRepository)
  })

  it("should be able to get Statement informations", async ()=>{

    const user = await createUserUseCase.execute({
      email: "email@example.com",
      name: "userTest",
      password: "passwordTest",
  })
  if(!user.id) return AppError
  const user_id = user.id

  const statement = await createStatementUseCase.execute({
    user_id,
    amount: 100,
    description: "description Test",
    type: OperationType.DEPOSIT
  })

  if(!statement.id) return AppError
  const statement_id = statement.id

  const informations = await getStatementOperationUseCase.execute({user_id,statement_id})

  expect(informations).toHaveProperty("id",statement_id)
  expect(informations).toHaveProperty("user_id",user_id)
  expect(informations).toHaveProperty("description")

  })


  })
