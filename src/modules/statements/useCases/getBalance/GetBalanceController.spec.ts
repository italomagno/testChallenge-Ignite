import { Connection } from "typeorm"
import createConnection from "../../../../database"
import request from "supertest"
import { app } from "../../../../app"



let connection: Connection


describe("Get balance", ()=>{
  beforeAll(async()=>{
    connection = await createConnection()
    await connection.runMigrations()
  })
  afterAll(async()=>{
    await connection.dropDatabase()
    await connection.close()
  })

  it("should be able to get balance",async()=>{
    await request(app)
    .post("/api/v1/users")
    .send({
      email: "test@example.com",
      password: "test",
      name: "test",
    })
    const user = await request(app)
    .post("/api/v1/sessions")
    .send({
      email: "test@example.com",
      password: "test",
    })
    await request(app)
    .post('/api/v1/statements/deposit')
    .set("authorization",`Bearer ${user.body.token}`)
    .send({
      amount: 150,
      description: "deposit $150 for test"
    })
    await request(app)
    .post('/api/v1/statements/withdraw')
    .set("authorization",`Bearer ${user.body.token}`)
    .send({
      amount: 140,
      description: "withdraw $140 for test"
    })

    const response = await request(app)
    .get("/api/v1/statements/balance")
    .set("authorization",`Bearer ${user.body.token}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("balance")
    expect(response.body).toHaveProperty("statement")

  })

})
