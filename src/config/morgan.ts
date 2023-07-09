import morgan from 'morgan';
import logger from '../lib/logger';

const isDevelopment = process.env.NODE_ENV === 'development';

const loggerStream: morgan.StreamOptions = {
    write: (message) => logger.http(message.substring(0, message.lastIndexOf('\n'))),
};
const morganMiddleware = morgan(':method :url :status :res[content-length]- :response-time ms', {
    stream: loggerStream,
    skip: () => !isDevelopment,
});

export default morganMiddleware;
