import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET;

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const user = await store.index();
  res.json(user);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.body.id);
  if (user) {
    res.json(user);
  } else {
    res.json('user not found');
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      user_name: req.body.user_name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password
    };

    const newUser = await store.create(user);
    const token = jwt.sign(
      {
        user: {
          user_name: newUser.user_name,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          id: newUser.id
        }
      },
      tokenSecret as string
    );
    res.json(token);
  } catch (err) {
    res.json(`Can't create user: ${err}`);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const user = (await store.authenticate(
      req.body.user_name,
      req.body.password
    )) as User;
    const token = jwt.sign(
      {
        user: {
          user_name: user.user_name,
          first_name: user.first_name,
          last_name: user.last_name,
          id: user.id
        }
      },
      tokenSecret as string
    );
    res.json(token);
  } catch (err) {
    res.json(`incorrect user and/or password: ${err}`);
  }
};

const userHandlers = (app: express.Application): void => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
  app.post('/authenticate', authenticate);
};

export default userHandlers;
