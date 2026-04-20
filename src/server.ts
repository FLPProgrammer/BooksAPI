import express from 'express';
import { errorHandler } from './Middlewares/errorHandler';
import { routes } from './Routes/index' 

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(routes);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`The server is running on: ${PORT}`)
})