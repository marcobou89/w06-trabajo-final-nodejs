require('../models')
const request = require('supertest')
const app = require('../app')
const Product = require('../models/Product')


const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/purchase'

let TOKEN
let purchase

beforeAll(async () => {
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
            title: 'Producto de prueba',
            price: 100,
            description: 'Descripcion del producto'
            
        })

    purchase={
        userId: user.id,
        productId: product.id,
        quantity: 1
    }

})

afterAll(async () => {
    await product.destroy()
})

test('POST -> BASE_URL, Should return statusCode 201, and res.body.quantity === purchase.quantity', async () => {
    const res = await request(app)
       .post(BASE_URL)
       .send(purchase)
       .set('Authorization', `Bearer ${TOKEN}`)
       console.log(res.body);
       

        expect(res.statusCode).toBe(201)
        expect(res.body.quantity).toBeDefined()
        expect(res.body.quantity).toBe(purchase.quantity)
        
})




