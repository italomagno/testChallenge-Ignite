
import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../../../../app";
import createConnection from "../../../../database/index"

let connection: Connection


describe("Authenticate User", ()=>{

  beforeAll(async ()=>{
    connection = await createConnection()
    await connection.runMigrations()
  })
  afterAll(async ()=>{
    await connection.dropDatabase()
    await connection.close()
  })

  it("should be able to authenticate an user", async ()=>{


  const user  = {
    email: "email@example.com",
    name: "userTest",
    password: "passwordTest",
  }

  await request(app)
  .post("/api/v1/users")
  .send(user)

    const response = await request(app)
    .post("/api/v1/sessions")
    .send({
      email: user.email,
      password: user.password
    })


    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("token")
    expect(response.body).toHaveProperty("user")
  })

  it("should not be able to authenticate an user with incorrect email", async ()=>{


    const user  = {
      email: "email@example.com",
      name: "userTest",
      password: "passwordTest",
    }

    await request(app)
    .post("/api/v1/users")
    .send(user)

      const response = await request(app)
      .post("/api/v1/sessions")
      .send({
        email: "user.email",
        password: user.password
      })

      expect(response.status).toBe(401)

    })

    it("should not be able to authenticate an user with incorrect password", async ()=>{


      const user  = {
        email: "email@example.com",
        name: "userTest",
        password: "passwordTest",
      }

      await request(app)
      .post("/api/v1/users")
      .send(user)

        const response = await request(app)
        .post("/api/v1/sessions")
        .send({
          email: user.email,
          password: "user.password"
        })

        expect(response.status).toBe(401)
      })

      it("should not be able to authenticate a non exists user", async ()=>{
        const user  = {
          name: "userTest",
          email: "email@example.com",
          password: "passwordTest"
        }

        await request(app)
        .post("/api/v1/users")
        .send(user)

          const response = await request(app)
          .post("/api/v1/sessions")
          .send({
            email: "user.email",
            password: "user.password"
          })

          expect(response.status).toBe(401)
        })


})
