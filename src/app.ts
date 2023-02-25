import express from 'express';
import 'express-async-errors';

import routes from './routes';
import errorHandlerMiddleware from './middlewares/error'

const app = express();

app.use(express.json());

app.use('/api', routes);

app.use(errorHandlerMiddleware);

export default app;