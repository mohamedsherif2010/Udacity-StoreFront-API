```
# Table of contents
```

* [API Endpoints](#api-endpoints)
1. [Authenticate](#authenticate))
2. [Products](#products)
3. [Users](#users)
4. [Orders](#orders)

 
* [Data Shapes](#data-shapes)
1. [Product](#product)
2. [User](#user)
3. [Order](#order)
4. [Order Products](#order-products)

[Database Tables](#database-tables)
1. [Product](#product)
2. [User](#user)
3. [Order](#order)
4. [Order Products](#order-products)
  

## API Endpoints
#### Authenticate
- Authenticate : products [GET]
- body : {username, password}


#### Products

- Index : /products [GET]
- Show : /productss/:id [GET]
- Create [token required] : /producsts [POST]


#### Users

- Index [token required] : /users [GET]
- Show [token required] : /users:id [GET]
- Create : /users [POST]
body : {user_name, first_name, lasst_name, password}


#### Orders

- Create [token required] : /users [POST]
- add product [token required] : /orders/:id [POST]
body : {product_id, order_id, quantity}
- Current Order by user [token required] : /orders/:id [GET]
body : {user_id}


## [Data Shapes](#api-requirements)
#### Product
- id
- name
- price
  

#### User
- id
- first_name
- last_name
- user_name
- password

#### Order
- id
- user_id
- completed

 
#### Order-Products
- id
- product id
- order id
- quantity of product


## Database Tables
#### Users

   Column   |         Type          | Collation | Nullable |              Default              
------------|-----------------------|-----------|----------|-----------------------------------
 id         | integer               |           | not null | nextval('users_id_seq'::regclass)
 user_name  | character varying(20) |           | not null | 
 first_name | character varying(15) |           | not null | 
 last_name  | character varying(15) |           | not null | 
 password   | character varying(25) |           | not null | 
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_user_name_key" UNIQUE CONSTRAINT, btree (user_name)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)


#### Products
  
   Column   |         Type          | Collation | Nullable |              Default              
------------|-----------------------|-----------|----------|-----------------------------------
 id         | integer               |           | not null | nextval('users_id_seq'::regclass)
 user_name  | character varying(20) |           | not null | 
 first_name | character varying(15) |           | not null | 
 last_name  | character varying(15) |           | not null | 
 password   | character varying(25) |           | not null | 
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_user_name_key" UNIQUE CONSTRAINT, btree (user_name)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)


#### Orders

  Column   |  Type   | Collation | Nullable |              Default               
-----------|---------|-----------|----------|------------------------------------
 id        | integer |           | not null | nextval('orders_id_seq'::regclass)
 completed | boolean |           | not null | 
 user_id   | integer |           | not null | 
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)

#### Order_Products

   Column   |  Type   | Collation | Nullable |                  Default                   
------------|---------|-----------|----------|--------------------------------------------
 id         | integer |           | not null | nextval('order_products_id_seq'::regclass)
 quantity   | integer |           | not null | 
 order_id   | integer |           | not null | 
 product_id | integer |           | not null | 
Indexes:
    "order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)