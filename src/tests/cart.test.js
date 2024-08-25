require('../models')
const request = require('supertest')
const app = require('../app')
const Product = require('../models/Product')
const User = require('../models/User')


const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/cart'

let TOKEN
let cart
let product_id
let user_Id
let product

beforeAll(async()=>{
    const user = {
     email: 'a@a.com',
     password: '123456'
    } 
    const res = await request(app)
    .post(BASE_URL_LOGIN)
    .send(user)

    TOKEN = res.body.token
    
    product = await Product.create(
        {
            title: "Iphone 10",
            description: "iphone the Ma",
            price: 101.50
        }
        )

    // userId = await User.create({
    //     firstName: 'util',
    //     lastName: 'test',
    //     email: 'util@a.com',
    //     password: '1sdfsdf',
    //     phone: 11546
    // })
    
    cart = {
        quantity: 1,
        userId: user.id,
        productId:1
        
    } 
    
    
    
})

afterAll((async()=>{

    await product.destroy()
    // await userId.destroy()

}))




test("POST -> BASE_URL, Should return statusCode 201, and res.body.title === cart.title  ", async()=>{

    
    const res = await request(app)
    .post(BASE_URL)
    .send(cart)
    .set('Authorization', `Bearer ${TOKEN}`)

    user_Id = res.body.id
    
    
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBeDefined()
    expect(res.body.quantity).toBe(cart.quantity)
    expect(res.body.userId).toBe(1)
    expect(res.body.productId).toBe(product.id)

    })

    test("GET -> BASE_URL, Should return statusCode 200 and res.body.length ===1", async()=>{
        
        const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)
            //    console.log(res.body);
               
       expect(res.statusCode).toBe(200)
       expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

        console.log(res.body);
        
        //1:n
        expect(res.body[0].id).toBe(product.id)
        // // //1:1
        // expect(res.body[0].id).toBe(userId.id)
    })

    test("GET -> 'BASE_URL/:id, should return statusCode 200, and res.body.title === cart.title", async () => {
        const res = await request(app)
          .get(`${BASE_URL}/${user_Id}`)
          .set('Authorization', `Bearer ${TOKEN}`)
    
        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()

        //1:n
        expect(res.body.quantity).toBeDefined()
        expect(res.body.id).toBe(product.id);
        //1:1
        expect(res.body.id).toBe(user_Id)
        
        
    })

    test("PUT -> BASE_URL/id, Should return statusCode 200, and res.body.quantity< === cartUpdate.quantity", async()=>{
        
        const cartUpdate={
            quantity: 1
        }

        const res = await request(app)
        
       .put(`${BASE_URL}/${user_Id}`)
       .send(cartUpdate)
       .set('Authorization', `Bearer ${TOKEN}`)
        
       expect(res.statusCode).toBe(200)
       expect(res.body).toBeDefined()
       expect(res.body.quantity).toBe(cartUpdate.quantity)

       //1:n
       expect(res.body.productId).toBeDefined()
       expect(res.body.productId).toBe(product.id)
       //1:1
       expect(res.body.id).toBeDefined()
       expect(res.body.id).toBe(user_Id)


       })

    test("DELETE -> BASE_URL/id, Should return statusCode 204", async()=>{
        
        const res = await request(app)
       .delete(`${BASE_URL}/${user_Id}`)
       .set('Authorization', `Bearer ${TOKEN}`)
        
       expect(res.statusCode).toBe(204)
    })
