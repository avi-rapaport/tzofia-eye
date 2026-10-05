import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { router as alertsRouter } from './routes/alerts.routes.js';

const PORT = process.env.PORT;

const app = express();

app.use(cors({ credentials: true, origin: process.env.CLIENT_ORIGIN }));
app.use(helmet());

app.use('/alerts', alertsRouter);

app.use((req, res) => {
  res.status(404).json(`${req.url} doesn't have ${req.method} method!`);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
