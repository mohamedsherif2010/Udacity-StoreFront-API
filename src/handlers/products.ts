import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.body.id);
  if (product) {
    res.json(product);
  } else {
    res.json('product not found');
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price
    };

    const newProduct = await store.create(product);

    res.json(newProduct);
  } catch (err) {
    res.json(`Could not add new product: ${err}`);
  }
};

const productHandlers = (app: express.Application): void => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', create);
};

export default productHandlers;
