import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../../../../app";


import createConnection from "../../../../database/index"

let connection: Connection


describe("Create User Controller", () => {

  beforeAll(async ()=>{
    connection = await createConnection()
    await connection.runMigrations()

  })

  afterAll(async ()=>{
    await connection.dropDatabase()
    await connection.close()
  })

  it("should be able to create an User", async () => {


   const response = await request(app).post("/api/v1/users").send({
    email: "email@example.com",
    name: "userTest",
    password: "passwordTest",
  })

  expect(response.status).toBe(201)

})
})



