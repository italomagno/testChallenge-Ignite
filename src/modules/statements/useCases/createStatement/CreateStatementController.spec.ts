import { Connection } from "typeorm"

import request from "supertest"

import createConnection from "../../../../database"

import {app} from "../../../../app"




let connection: Connection





describe("Create statement controller", () => {
  beforeAll(async ()=>{
    connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async ()=>{
    await connection.dropDatabase()
    await connection.close()
  })

  it("should be able to create a deposit statement", async ()=>{

    await request(app)
    .post("/api/v1/users")
    .send({
    email: "email@example.com",
    name: "userTest",
    password: "passwordTest",
    })

    const userAuthenticated =  await request(app)
    .post("/api/v1/sessions")
    .send({
      email: "email@example.com",
      password: "passwordTest"

    })





    const response = await request(app)
    .post('/api/v1/statements/deposit')
    .set("authorization",`Bearer ${userAuthenticated.body.token}`)
    .send({
      amount: 150,
      description: "deposit $150 for test"
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("amount")
    expect(response.body).toHaveProperty("created_at")
    expect(response.body).toHaveProperty("description")
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("type")
    expect(response.body).toHaveProperty("updated_at")
    expect(response.body).toHaveProperty("user_id")
  })
  it("should not be able to create a deposit statement with non     authenticated user", async ()=>{

    await request(app)
    .post("/api/v1/users")
    .send({
    email: "email@example.com",
    name: "userTest",
    password: "passwordTest",
    })
    const unauthorizedUser = await request(app)
    .post("/api/v1/users")
    .send({
    email: "unauthorizeduser@example.com",
    name: "userUnauthorizedTest",
    password: "passwordTest",
    })

    const userAuthenticated =  await request(app)
    .post("/api/v1/sessions")
    .send({
      email: "email@example.com",
      password: "passwordTest"
    })


    const response = await request(app)
    .post('/api/v1/statements/deposit')
    .set("authorization",`Bearer ${unauthorizedUser.body.token}`)
    .send({
      amount: 150,
      description: "deposit $150 for test"
    })

    expect(response.status).toBe(401)
  })
  it("should be able to create a withdraw statement", async ()=>{

      await request(app)
      .post("/api/v1/users")
      .send({
      email: "email@example.com",
      name: "userTest",
      password: "passwordTest",
      })

      const userAuthenticated =  await request(app)
      .post("/api/v1/sessions")
      .send({
        email: "email@example.com",
        password: "passwordTest"

      })


      const response = await request(app)
      .post('/api/v1/statements/withdraw')
      .set("authorization",`Bearer ${userAuthenticated.body.token}`)
      .send({
        amount: 150,
        description: "withdraw $150 for test"
      })
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty("amount")
      expect(response.body).toHaveProperty("created_at")
      expect(response.body).toHaveProperty("description")
      expect(response.body).toHaveProperty("id")
      expect(response.body).toHaveProperty("type")
      expect(response.body).toHaveProperty("updated_at")
      expect(response.body).toHaveProperty("user_id")
    })
  it("should not be able to withdraw an amount if non exists founds", async ()=>{

      await request(app)
      .post("/api/v1/users")
      .send({
      email: "email@example.com",
      name: "userTest",
      password: "passwordTest",
      })

      const userAuthenticated =  await request(app)
      .post("/api/v1/sessions")
      .send({
        email: "email@example.com",
        password: "passwordTest"

      })


      const response = await request(app)
      .post('/api/v1/statements/withdraw')
      .set("authorization",`Bearer ${userAuthenticated.body.token}`)
      .send({
        amount: 160,
        description: "withdraw $150 for test"
      })
      expect(response.status).toBe(400)

    })
  it("should not be able to create a withdraw statement with non     authenticated user", async ()=>{

      await request(app)
      .post("/api/v1/users")
      .send({
      email: "email@example.com",
      name: "userTest",
      password: "passwordTest",
      })
      const unauthorizedUser = await request(app)
      .post("/api/v1/users")
      .send({
      email: "unauthorizeduser@example.com",
      name: "userUnauthorizedTest",
      password: "passwordTest",
      })

      const userAuthenticated =  await request(app)
      .post("/api/v1/sessions")
      .send({
        email: "email@example.com",
        password: "passwordTest"
      })


      const response = await request(app)
      .post('/api/v1/statements/withdraw')
      .set("authorization",`Bearer ${unauthorizedUser.body.token}`)
      .send({
        amount: 150,
        description: "withdraw $150 for test"
      })

      expect(response.status).toBe(401)
    })


})
