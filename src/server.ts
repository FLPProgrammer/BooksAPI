import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';


import { errorHandler } from './Middlewares/errorHandler';
import { routes } from './Routes/index';
import { connectRedis } from './Utils/Redis'; // 👈 IMPORTANTE

const app = express();
const PORT = 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: 'Muitas requisições. Tente novamente depois.',
});

// Middlewares globais
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(limiter);

// Routes
app.use(routes);

// Error handler (sempre por último)
app.use(errorHandler);

// 🚀 BOOTSTRAP (CORRETO)
async function bootstrap() {
  try {
    // 1. conecta Redis antes de tudo
    await connectRedis();

    console.log('Redis connected successfully');

    // 2. inicia servidor só depois do Redis
    app.listen(PORT, () => {
      console.log(`The server is running on: ${PORT}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();