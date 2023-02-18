import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../../server';

dotenv.config();
const token = process.env.JWT_TEST_TOKEN as string;
const request = supertest(app);

const product = {
  name: 'product_test',
  price: 8
};

it('should return success for read all products', async () => {
  const response = await request.get('/products');
  expect(response.status).toBe(200);
  expect(response.body).toBeTruthy();
});

it('should return success for read product by product name', async () => {
  const response = await request.get('/products').send(product);
  expect(response.status).toBe(200);
  expect(response.body).toBeTruthy();
});

it('should return success for create new product', async () => {
  const response = await request
    .post('/products')
    .auth(token, { type: 'bearer' })
    .send(product);
  expect(response.status).toBe(200);
  expect(response.body).toBeTruthy();
});
