import { Connection } from "typeorm"
import { app } from "../../../../app"
import request from "supertest"

import createConnection from "../../../../database"



let connection:Connection

describe("Get statement operation",()=>{

  beforeAll(async()=>{
    connection =await  createConnection();
    await connection.runMigrations()
  })
  afterAll(async()=>{
    await connection.dropDatabase()
    await connection.close()
  })

  it("should be able to get statement operations", async()=>{


    await request(app)
    .post("/api/v1/users")
    .send({
      email:"test@gmail.com",
      password:"password",
      name:"tester"
    })

    const user = await request(app)
    .post("/api/v1/sessions")
    .send({
      email:"test@gmail.com",
      password:"password",
    })

    const deposit = await request(app)
    .post("/api/v1/statements/deposit")
    .set("authorization",`Bearer ${user.body.token}`)
    .send({
      amount:50,
      description:"deposit $50 for test"
    })

    const response = await request(app)
    .get(`/api/v1/statements/${deposit.body.id}`)
    .set("authorization",`Bearer ${user.body.token}`)


    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("id")




  })


})
