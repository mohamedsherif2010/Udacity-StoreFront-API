import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  MODE
} = process.env;

let client: Pool = new Pool();

if (MODE === 'test') {
  client = new Pool({
    host:POSTGRES_HOST,
    database:POSTGRES_TEST_DB,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD
  });
}

if (MODE === 'dev') {
  client = new Pool({
    host:POSTGRES_HOST,
    database:POSTGRES_DB,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD
  });
}

export default client;
