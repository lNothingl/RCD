import express from 'express';
import cookieParser from 'cookie-parser';
import router from '@src/router/index.js';
import cors from 'cors';
import qs from 'qs';
import { checkRedisConnection } from '@src/redis.js';

const app = express();

app.enable('trust proxy');
app.use(
  cors({
    origin: true,
    credentials: true,
    exposedHeaders: ['Content-Disposition', 'Content-Length'],
  }),
);
app.set('query parser', (str: string) =>
  qs.parse(str, {
    arrayLimit: 100,
    comma: true,
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

const port = process.env.PORT || 3000;
checkRedisConnection().then((isConnected) => {
  if (!isConnected) {
    console.warn('Redis is not available, application will run in fallback mode');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
