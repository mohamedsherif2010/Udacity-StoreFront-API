import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;
export type User = {
  id?: number;
  user_name: string;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find users: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (user_name,first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *';
      const hash = bcrypt.hashSync(
        u.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );
      const result = await conn.query(sql, [
        u.user_name,
        u.first_name,
        u.last_name,
        hash
      ]);
      const user = result.rows[0];
      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Couldn't create new user : ${err}`);
    }
  }

  async authenticate(
    user_name: string,
    password: string
  ): Promise<User | null> {
    const conn = await client.connect();
    const sql = `SELECT password FROM users WHERE user_name=($1)`;
    const result = await conn.query(sql, [user_name]);

    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
        return user;
      }
    }
    return null;
  }
}
