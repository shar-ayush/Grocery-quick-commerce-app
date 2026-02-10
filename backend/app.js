import 'dotenv/config';
import fastify from 'fastify';
import {connectDB} from './src/config/connection.js';

const start = async () => {
    await connectDB(process.env.MONGO_URI);
    const app = fastify();

    app.listen({port: process.env.PORT, host: '0.0.0.0'}, (err, address) => {
        if (err) {
            console.error(err);
        }
        else console.log(`Server running at Port :${process.env.PORT}`);
    })
}

start();