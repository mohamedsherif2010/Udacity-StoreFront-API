import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../../server';

dotenv.config();
const token = process.env.JWT_TEST_TOKEN as string;
const request = supertest(app);

it('should return success for create new order', async () => {
  const response = await request
    .post('/orders')
    .auth(token, { type: 'bearer' })
    .send({ userId: 1 });
  expect(response.body).toBeTruthy();
});

it('should return success for add Product to order', async () => {
  const response = await request
    .post('/orders/:id/products')
    .auth(token, { type: 'bearer' })
    .send({ quantity: 2, orderId: 1, productId: 1 });

  expect(response.body).toBeTruthy();
});

it('should return success for get user orders by user id', async () => {
  const response = await request.get('/users/:id/orders').send('userId=1');

  expect(response.body).toBeTruthy();
});
