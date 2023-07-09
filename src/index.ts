import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';
import koii from 'koii';
import { connect } from './db';
import routes from './routes/index';
import swaggerSpec from '../documentation/swagger.json';
import morganMiddleware from './config/morgan';
import logger from './lib/logger';

dotenv.config();

const baseUrl = '/v1';
const port = process.env.PORT || 3000;

const app: Express = express();

app.use(express.json());
app.use(morganMiddleware);
app.use(cors());
app.use(compression());
app.use(helmet());

app.get(`${baseUrl}/doc`, (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use(`${baseUrl}`, routes);
app.use(`${baseUrl}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (_req, res) => {
    res.send('Barefoot Nomad API');
});

app.use(koii);

app.all('*', (_req, res) => {
    res.status(404).json({
        error: 'This route does not exist yet!',
    });
});

connect().then(() => {
    if (process.env.NODE_ENV !== 'test') {
        app.listen(port, () => {
            logger.log('info', `Listening on port ${port}...`);
        });
    }
});

export default app;
