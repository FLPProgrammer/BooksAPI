import express from 'express';
import helmet from 'helmet'
import cors from 'cors';
import rateLimit  from 'express-rate-limit';
import { errorHandler } from './Middlewares/errorHandler';
import { routes } from './Routes/index' 

const app = express();
const PORT = 3000;
const limiter = rateLimit ({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: 'Muitas requisições. Tente novamente depois.'
})

app.use(express.json());
app.use(express.json);
app.use(limiter)
app.use(cors)
app.use(routes);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`The server is running on: ${PORT}`)
})