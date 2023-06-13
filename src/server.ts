import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/loggser';

let server: Server;

// FIXME: Not Working uncaught exceptions
process.on('uncaughtException', error => {
    errorLogger.error(error);
    console.log('UnCaught exception is detected...');
    process.exit(1);
});

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        logger.info(`🆗 Database is connected successfully`);

        server = app.listen(config.port, () => {
            logger.info(`🆗 Application  listening on port ${config.port}`);
        });
    } catch (error: any) {
        errorLogger.error('🚫 ' + error);
    }

    process.on('unhandledRejection', error => {
        if (server) {
            server.close(() => {
                errorLogger.error(error);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}

main();

process.on('SIGTERM', () => {
    logger.info('SIGTERM is received');
    if (server) {
        server.close();
    }
});
