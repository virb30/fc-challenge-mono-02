import { app } from './express';
import dotenv from 'dotenv';

dotenv.config();
const port: number = Number(process.env.PORT) || 3000;

app.listen(port, () => {
    console.log(`server started listening on localhost:${port}`);
});