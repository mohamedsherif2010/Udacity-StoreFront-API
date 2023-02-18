import { User, UserStore } from '../user';
import { order, orderProducts, orderStore } from '../order';
import { Product, ProductStore } from '../product';

const oStore = new orderStore();
const pStore = new ProductStore();
const uStore = new UserStore();

const newUser: User = {
  id:1,
  user_name: 'user1',
  first_name: 'testUser',
  last_name: 'user1last',
  password: 'pass1111'
  
};

const newProduct: Product = {
  id:1,
  name: 'product',
  price: 300
};

const newOrder: order = {
  id:1,
  completed: false,
  user_id: 1
};

const newOrderProduct: orderProducts = {
  quantity: 8,
  order_id: newOrder.id as number,
  product_id: newProduct.id as number
};


describe('User model tests', () => {
  it('create user should add a new user', async () => {
    const result = await uStore.create(newUser);
    expect(result.user_name).toEqual(newUser.user_name);
    expect(result.first_name).toEqual(newUser.first_name);
    expect(result.last_name).toEqual(newUser.last_name);
  });

  it('index method should return a list of users', async () => {
    const result = await uStore.index();
    expect(result[0].user_name).toEqual(newUser.user_name);
    expect(result[0].first_name).toEqual(newUser.first_name);
    expect(result[0].last_name).toEqual(newUser.last_name);
  });

  it('show method should return the correct user', async () => {
    const result = await uStore.show('1');
    expect(result.user_name).toEqual(newUser.user_name);
    expect(result.first_name).toEqual(newUser.first_name);
    expect(result.last_name).toEqual(newUser.last_name);
  });
});


describe('Product model tests', () => {
  it('create should add a new product', async () => {
    const result = await pStore.create(newProduct);
    expect(result.name).toEqual(newProduct.name);
    expect(result.price).toEqual(newProduct.price);
  });
  it('index method should return a list of products', async () => {
    const result = await pStore.index();
    expect(result.length).toBe(1);
    expect(result[0].name).toEqual(newProduct.name);
    expect(result[0].price).toEqual(newProduct.price);
  });

  it('show method should return the correct product', async () => {
    const result = await pStore.show('1');
    expect(result.name).toEqual(newProduct.name);
    expect(result.price).toEqual(newProduct.price);
  });
});

describe('Order model tests', () => {
  it('create  should add a new order', async () => {
    const result = await oStore.create(newOrder);
    expect(result.user_id).toEqual(newOrder.user_id);
    expect(result.completed).toEqual(newOrder.completed);
  });

  it('addProduct should return the new order product item', async () => {
    const result = await oStore.addProduct(
      newOrderProduct.quantity,
      newOrderProduct.order_id,
      newOrderProduct.product_id
    );
    expect(result.id).toEqual(1);
    expect(result.order_id).toEqual(newOrderProduct.order_id);
    expect(result.product_id).toEqual(newOrderProduct.product_id);
    expect(result.quantity).toEqual(newOrderProduct.quantity);
  });
  it('getUserOrders method should return a list of orders for this user', async () => {
    const result = await oStore.getUserOrders(newUser.id as number);
    expect(result[0].user_id).toEqual(newOrder.user_id);
    expect(result[0].completed).toEqual(newOrder.completed);
  });

});