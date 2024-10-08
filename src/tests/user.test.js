const request= require("supertest")
const app = require("../app")

let TOKEN
let TOKEN2
let userId


beforeAll(async()=>{
   const user = {
    email: 'a@a.com',
    password: '123456'
   } 
   const res = await request(app)
   .post(`${BASE_URL}/login`)
   .send(user)

   TOKEN = res.body.token
})



const user ={
    firstName: 'util',
    lastName: 'test',
    email: 'util@a.com',
    password: '1sdfsdf',
    phone: 11546
}

const BASE_URL='/api/v1/users'

test("POST -> BASE_URL, Should return statusCode 201, and res,body.firstName === user.firstName  ", async()=>{

    // const columns = ['firstName','lastName','email','password','phone']
    const res = await request(app)
    .post(BASE_URL)
    .send(user)

    userId=res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()

    
    // columns.forEach((columns)=>{


    // })

    expect(res.body.lastName).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)

    })

    test("GET -> BASE_URL, Should return statusCode 200 and res.body.length ===2", async()=>{
        
        const res = await request(app)
        .get(BASE_URL)
       .set('Authorization', `Bearer ${TOKEN}`)
        
       expect(res.statusCode).toBe(200)
       expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(2)
    })

    //put
    test("PUT -> BASE_URL/id, Should return statusCode 200, and res.body.firstName === userUpdate.firstName", async()=>{
        
        const userUpdate={
            firstName: 'jose'
        }

        const res = await request(app)
        
       .put(`${BASE_URL}/${userId}`)
       .send(userUpdate)
       .set('Authorization', `Bearer ${TOKEN}`)
        
       expect(res.statusCode).toBe(200)
       expect(res.body).toBeDefined()
       expect(res.body.firstName).toBe(userUpdate.firstName)
       })
      
       

    test("POST -> 'BASE_URL/LOGIN, should return code 200, and res.body.user.email ===user.email", async()=>{
        
        const user={
            email: 'util@a.com',
            password: '1sdfsdf'

        }
        const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(user)

        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.user).toBeDefined()
        expect(res.body.token).toBeDefined()
        expect(res.body.user.email).toBe(user.email)

       })

       // error 401
       test("POST -> 'BASE_URL/LOGIN, should return statuscode 401", async()=>{
       
        const hits ={
            email: user.email,
            password: "invalid" // error en la contraseña

        }

        const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(hits)

        expect(res.statusCode).toBe(401)
    
    
    })

    
     //delete
     test("DELETE -> BASE_URL/id, Should return statusCode 204", async()=>{
        
        const res = await request(app)
       .delete(`${BASE_URL}/${userId}`)
       .set('Authorization', `Bearer ${TOKEN}`)
        
       expect(res.statusCode).toBe(204)
       })

