import { Connection } from "typeorm";

import request from "supertest"


import createConnection from "../../../../database"
import { app } from "../../../../app";

let connection: Connection


describe("Show User Profile", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations()
  })
  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it("should not be able to show the user profile of non-authenticated user", async () => {

    const user = await request(app)
    .post("/api/v1/users")
    .send({
      name: 'userTest',
      email: 'email@example.com',
      password: 'password'
    })

  const response = await request(app)
    .get("/api/v1/profile")
    .set("authorization",`Bearer ${user.body.token}`)


    expect(response.status).toBe(401)



})



  it("should be able to show the user profile", async () => {

     await request(app)
      .post("/api/v1/users")
      .send({
        name: 'userTest',
        email: 'email@example.com',
        password: 'password'
      })

      const user = await request(app)
      .post("/api/v1/sessions")
       .send({
        email: 'email@example.com',
        password: 'password'
        })

    const response = await request(app)
      .get("/api/v1/profile")
      .set("authorization",`Bearer ${user.body.token}`)


    expect(response.status).toBe(200)

  })

})
