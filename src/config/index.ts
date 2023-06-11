import dotent from 'dotenv';
import path from 'path';

dotent.config({path: path.join(process.cwd(), ".env")});

export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
}
