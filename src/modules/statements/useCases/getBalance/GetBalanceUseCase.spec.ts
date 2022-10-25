//A rota recebe um token JWT pelo header da requisição e retorna uma lista com todas as operações de depósito e saque do usuário autenticado e também o saldo total numa propriedade balance.

import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase"
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository"
import { GetBalanceUseCase } from "./GetBalanceUseCase"
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase"
import { OperationType } from "../../entities/Statement"
import { AppError } from "../../../../shared/errors/AppError"



let getbalanceUseCase: GetBalanceUseCase
let inMemoryStatementsRepository: InMemoryStatementsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let createStatementUseCase: CreateStatementUseCase


describe("Get Balance", ()=>{
beforeEach(()=>{

  inMemoryStatementsRepository = new InMemoryStatementsRepository()
  inMemoryUsersRepository = new InMemoryUsersRepository()

  createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
  createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository,inMemoryStatementsRepository)

  getbalanceUseCase = new GetBalanceUseCase(inMemoryStatementsRepository,inMemoryUsersRepository)
})

it("should be able to get the balance of an User", async ()=>{

  const user = await createUserUseCase.execute({
    email: "email@example.com",
    name: "userTest",
    password: "passwordTest",
})
if(!user.id) return AppError
const user_id = user.id

await createStatementUseCase.execute({
  user_id,
  amount: 100,
  description: "description Test",
  type: OperationType.DEPOSIT
})
await createStatementUseCase.execute({
  user_id,
  amount: 50,
  description: "description Test",
  type: OperationType.WITHDRAW
})

const balance = await getbalanceUseCase.execute({user_id})

expect(balance.balance).toEqual(50)
})


})
