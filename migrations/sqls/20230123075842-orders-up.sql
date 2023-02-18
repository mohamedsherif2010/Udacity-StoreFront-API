CREATE TABLE orders(
id SERIAL PRIMARY KEY,
completed Boolean NOT NULL,
user_id INTEGER REFERENCES users(id) NOT NULL
);