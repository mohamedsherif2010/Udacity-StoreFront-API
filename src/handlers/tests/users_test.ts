import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../../server';

dotenv.config();
const token = process.env.JWT_TEST_TOKEN as string;
const request = supertest(app);

const userInstance = {
  username: 'mohamed_sherif',
  firstname: 'mohamed',
  lastname: 'sherif',
  password: 'password123'
};

it('should return success for create user', async () => {
  const response = await request.post('/users').send(userInstance);

  expect(response.status).toBe(200);
  expect(response.body).toBeTruthy();
});

it('should return success for get all users', async () => {
  const response = await request.get('/users').auth(token, { type: 'bearer' });

  expect(response.status).toBe(200);
  expect(response.body).toBeTruthy();
});

it('should return success for read user by username', async () => {
  const response = await request
    .get('/users')
    .auth(token, { type: 'bearer' })
    .send(`username=${userInstance.username}`);

  expect(response.status).toBe(200);
  expect(response.body).toBeTruthy();
});

it('should return success for login user', async () => {
  const response = await request.post('/users').send({
    username: userInstance.username,
    password: userInstance.password
  });

  expect(response.status).toBe(200);
  expect(response.body).toBeTruthy();
});
