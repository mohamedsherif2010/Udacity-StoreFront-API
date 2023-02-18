import client from '../database';

export type order = {
  id?: number;
  completed: boolean;
  user_id: number;
};

export type orderProducts = {
  id?: number;
  quantity: number;
  product_id: number;
  order_id: number;
};

export class orderStore {
  async create(o: order): Promise<order> {
    try {
      const sql =
        'INSERT INTO orders (completed, user_id) VALUES($1, $2) RETURNING *';
      const conn = await client.connect();

      const result = await conn.query(sql, [o.completed, o.user_id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order to user: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<orderProducts> {
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(ordersql, [orderId]);
      const order = result.rows[0];

      if (order.completed === true) {
        throw new Error(`Could not add product`);
      }

      conn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }

    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const conn = await client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const orderProducts: orderProducts = result.rows[0];

      conn.release();

      return orderProducts;
    } catch (err) {
      throw new Error(`Could not add product: ${err}`);
    }
  }

  async getUserOrders(user_id: number): Promise<order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=$1';

      const result = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }
}
