require('../models')
const request = require('supertest')
const app = require('../app')
const Category = require('../models/Category')

const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/products'

let TOKEN
let product
let productId
let category

beforeAll(async()=>{
    const user = {
     email: 'a@a.com',
     password: '123456'
    } 
    const res = await request(app)
    .post(BASE_URL_LOGIN)
    .send(user)

    TOKEN = res.body.token

    category = await Category.create({name:'ropa para dama'})

    product = {
        title: "Iphone 100",
        description: "iphone the Mac",
        price: 100.50,
        categoryId: category.id
    }

})

afterAll((async()=>{

    await category.destroy()

}))

test("POST -> BASE_URL, Should return statusCode 201, and res.body.title === product.title  ", async()=>{

    
    const res = await request(app)
    .post(BASE_URL)
    .send(product)
    .set('Authorization', `Bearer ${TOKEN}`)

    productId=res.body.id
    // console.log(res.body);
    
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.description).toBeDefined()
    expect(res.body.title).toBe(product.title)
    expect(res.body.categoryId).toBe(category.id)

    })

    test("GET -> BASE_URL, Should return statusCode 200 and res.body.length ===1", async()=>{
        
        const res = await request(app)
        .get(BASE_URL)
            //    console.log(res.body);
               
       expect(res.statusCode).toBe(200)
       expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)

        //1:n
        expect(res.body[0].categoryId).toBe(category.id)
        //1:1
        expect(res.body[0].category.name).toBe(category.name)
    })

    test("GET -> 'BASE_URL/:id, should return statusCode 200, and res.body.title === product.title", async () => {
        const res = await request(app)
          .get(`${BASE_URL}/${productId}`)
    
        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()

        //1:n
        expect(res.body.category.id).toBeDefined()
        expect(res.body.category.id).toBe(category.id)
    })

    test("PUT -> BASE_URL/id, Should return statusCode 200, and res.body.title === productUpdate.title", async()=>{
        
        const productUpdate={
            title: 'SmartPhone'
        }

        const res = await request(app)
        
       .put(`${BASE_URL}/${productId}`)
       .send(productUpdate)
       .set('Authorization', `Bearer ${TOKEN}`)
        
       expect(res.statusCode).toBe(200)
       expect(res.body).toBeDefined()
       expect(res.body.title).toBe(productUpdate.title)

       //1:n
       expect(res.body.categoryId).toBeDefined()
       expect(res.body.categoryId).toBe(category.id)



       })

    test("DELETE -> BASE_URL/id, Should return statusCode 204", async()=>{
        
        const res = await request(app)
       .delete(`${BASE_URL}/${productId}`)
       .set('Authorization', `Bearer ${TOKEN}`)
        
       expect(res.statusCode).toBe(204)
    })
