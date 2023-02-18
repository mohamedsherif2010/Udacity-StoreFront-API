import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userHandlers from './handlers/users';
import productHandlers from './handlers/products';
import orderHandlers from './handlers/orders';

const app: express.Application = express();
const address: string = '0.0.0.0:5000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Store Front API');
});

userHandlers(app);
productHandlers(app);
orderHandlers(app);
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
export default app;
