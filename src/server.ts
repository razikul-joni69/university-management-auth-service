import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function main() {
    try {
        mongoose.connect(config.database_url as string);
        console.log('🆗 Database connection established');

        app.listen(config.port, () => {
            console.log(
                '🆗 Auth Application is running on port ' + config.port
            );
        });
    } catch (error: any) {
        console.log('Error to connect to database', error.message);
    }
}

main();
