import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { router as alertsRouter } from './routes/alerts.routes.js';
import { errorHandler } from './utils/errorHandler.js';
import { router as authRouter } from './routes/auth.routes.js';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLIENT_ORIGIN }));
app.use(helmet());

app.use('/api/alerts', alertsRouter);
app.use('/api/auth', authRouter);

app.use((req, res) => {
  res.status(404).json(`${req.url} doesn't have ${req.method} method!`);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
