require('../models')
const request = require('supertest')
const app = require('../app');

const Cart = require('../models/Cart');
const Product = require('../models/Product');

const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/purchase'
const BASE_URL_CART = '/api/v1/cart'
let TOKEN
let cart
// let purchase

beforeAll(async () => {
    const user = {
        email: 'a@a.com',
        password: '123456'
    }
    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(user)
        
    TOKEN = res.body.token

    product = await Product.create({
         title: "Iphone 10",
         description: "iphone the Ma",
         price: 101.50
     })

    cart = await Cart.create(
        {
            quantity: 6
            // userId: user.id,
            // productId:product.id
            
        })

    

    purchase={
        userId: user.id,
        productId: product.id,
        quantity: 1
    }

})

afterAll(async () => {
    await product.destroy()
    await cart.destroy()
})


test('POST -> BASE_URL, Should return statusCode 201, and res.body.quantity === purchase.quantity', async () => {
    const res = await request(app)
       .post(BASE_URL)
       .send(cart)
       .set('Authorization', `Bearer ${TOKEN}`)
    //    console.log(res.body);
       

        expect(res.statusCode).toBe(201)
        // expect(res.body.quantity).toBeDefined()
        // expect(res.body.quantity).toBe(purchase.quantity)
        
})

test("GET -> BASE_URL, Should return statusCode 200 and res.body.length ===1", async () => {
    const res = await request(app)
       .get(BASE_URL)
    //    .send(purchase)
       .set('Authorization', `Bearer ${TOKEN}`)
    //    console.log(res.body);
       

        expect(res.statusCode).toBe(200)
        // expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(0)

        // expect(res.body.quantity).toBeDefined()
        // expect(res.body.quantity).toBe(purchase.quantity)
        
})












// describe('Purchase API', () => {
//     let token;
//     let product;
//     let purchase;
  
//     beforeAll(async () => {
//       const user = {
//         email: 'a@a.com',
//         password: '123456',
//       };
//       const res = await request(app)
//         .post(BASE_URL_LOGIN)
//         .send(user);
  
//       token = res.body.token;
  
//       product = await Product.create({
//         title: 'Producto de prueba',
//         price: 100,
//         description: 'Descripcion del producto',
//       });
  
//       purchase = {
//         userId: user.id,
//         productId: product.id,
//         quantity: 1,
//       };
//     });
  
//     afterAll(async () => {
//       await product.destroy();
//     });
  
//     test('POST -> /api/v1/purchase, Should return statusCode 201, and res.body.quantity === purchase.quantity', async () => {
//       const res = await request(app)
//         .post(BASE_URL)
//         .send(purchase)
//         .set('Authorization', `Bearer ${token}`);
  
//       expect(res.statusCode).toBe(201);
//       expect(res.body.quantity).toBeDefined();
//       expect(res.body.quantity).toBe(purchase.quantity);
//     });
  
//     test('POST -> /api/v1/purchase, Should return error 401 if no token is provided', async () => {
//       const res = await request(app)
//         .post(BASE_URL)
//         .send(purchase);
  
//       expect(res.statusCode).toBe(401);
//       expect(res.body.error).toBe('Unauthorized');
//     });
  
//     test('POST -> /api/v1/purchase, Should return error 400 if quantity is 0', async () => {
//       purchase.quantity = 0;
//       const res = await request(app)
//         .post(BASE_URL)
//         .send(purchase)
//         .set('Authorization', `Bearer ${token}`);
  
//       expect(res.statusCode).toBe(400);
//       expect(res.body.error).toBe('Quantity must be greater than 0');
//     });
//   });






// require('../models')
// const request = require('supertest')
// const app = require('../app')
// const Product = require('../models/Product')


