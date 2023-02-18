import express, { Request, Response } from 'express';
import { authenticate } from '../helpers/auth';
import { order, orderStore } from '../models/order';

const store = new orderStore();

const create = async (req: Request, res: Response) => {
  try {
    const order: order = {
      completed: req.body.completed,
      user_id: req.body.user_id
    };

    const newOrder = await store.create(order);

    res.json(newOrder);
  } catch (err) {
    res.json(`Can't create order: ${err}`);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const orderId: number = parseInt(req.body.id);
    const productId: number = parseInt(req.body.product_id);
    const quantity: number = parseInt(req.body.quantity);
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.json(`Can't add order: ${err}`);
  }
};

const getUserOrders = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.body.id);

  try {
    const addedProduct = await store.getUserOrders(userId);
    res.json(addedProduct);
  } catch (err) {
    res.json(`Can't get user order: ${err}`);
  }
};

const orderHandlers = (app: express.Application): void => {
  app.post('/orders', authenticate, create);
  app.post('/orders/:id/products', authenticate, addProduct);
  app.get('/users/:id/orders', authenticate, getUserOrders);
};

export default orderHandlers;
