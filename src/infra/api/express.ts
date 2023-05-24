import express, { Express } from 'express';
import { productRouter } from './routes/product.routes';
import { clientRouter } from './routes/client.routes';
import { checkoutRouter } from './routes/checkout.routes';
import { addModels } from '../db/config';
import { invoiceRouter } from './routes/invoice.routes';

export const app: Express = express();

app.use(express.json());
app.use('/products', productRouter);
app.use('/clients', clientRouter);
app.use('/checkout', checkoutRouter);
app.use('/invoice', invoiceRouter);

addModels();