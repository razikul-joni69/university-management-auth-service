import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/loggser';

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        logger.info(`🆗 Database is connected successfully`);

        app.listen(config.port, () => {
            logger.info(`🆗 Application  listening on port ${config.port}`);
        });
    } catch (error: any) {
        errorLogger.error('🚫 ' + error.message);
    }
}

main();
