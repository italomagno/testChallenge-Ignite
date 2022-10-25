import { AppError } from "../../../../shared/errors/AppError"
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase"
import { OperationType } from "../../entities/Statement"
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository"
import { CreateStatementUseCase } from "./CreateStatementUseCase"


let inMemoryStatementsRepository: InMemoryStatementsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let createStatementUseCase: CreateStatementUseCase



describe("create a new statement", ()=>{

  beforeEach(()=>{
    inMemoryStatementsRepository = new InMemoryStatementsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()

    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository,inMemoryStatementsRepository)
  })

  it("should be able to deposit a value", async() => {

  const user = await createUserUseCase.execute({
      email: "email@example.com",
      name: "userTest",
      password: "passwordTest",
  })
  if(!user.id) return AppError
  const user_id = user.id

  const depositStatement = await createStatementUseCase.execute({
    user_id,
    amount: 50,
    description: "description Test",
    type: OperationType.DEPOSIT
  })

  expect(depositStatement.amount).toEqual(50)
  expect(depositStatement).toHaveProperty("id")

  })


  it("should be able to withdraw a value", async() => {

    const user = await createUserUseCase.execute({
        email: "email@example.com",
        name: "userTest",
        password: "passwordTest",
    })
    if(!user.id) return AppError
    const user_id = user.id

     await createStatementUseCase.execute({
      user_id,
      amount: 50,
      description: "description Test",
      type: OperationType.DEPOSIT
    })
    const depositStatement = await createStatementUseCase.execute({
      user_id,
      amount: 50,
      description: "description Test",
      type: OperationType.WITHDRAW
    })

    expect(depositStatement.amount).toEqual(50)
    expect(depositStatement).toHaveProperty("id")

    })



  it("should not be able to withdraw a negative amount", async () => {
    expect(async ()=>{
      const user = await createUserUseCase.execute({
        email: "email@example.com",
        name: "userTest",
        password: "passwordTest",
    })
    if(!user.id) return AppError
    const user_id = user.id

    await createStatementUseCase.execute({
      user_id,
      amount: 50,
      description: "description Test",
      type: OperationType.WITHDRAW
    })
    }).rejects.toBeInstanceOf(AppError)
    })



})
