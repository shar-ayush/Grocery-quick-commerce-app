import 'dotenv/config';
import fastify from 'fastify';
import {connectDB} from './src/config/connection.js';
import fastifySocketIO from 'fastify-socket.io';
import {registerRoutes} from './src/routes/index.js';
import {admin, buildAdminRouter} from './src/config/setup.js';

const start = async () => {
    await connectDB(process.env.MONGO_URI);
    const app = fastify();

    app.register(fastifySocketIO, {
        cors: {
            origin: "*",
        },
        pingInterval: 10000,
        pingTimeout: 5000,
        transports: ["websocket"],
    });
    
    await registerRoutes(app);

    await buildAdminRouter(app);

    app.listen({port: process.env.PORT, host: '0.0.0.0'}, (err, address) => {
        if (err) {
            console.error(err);
        }
        else console.log(`Server running on http://localhost:${process.env.PORT}${admin.options.rootPath}`);
    })

    app.ready().then(() => {
        app.io.on('connection', (socket) => {
            console.log("A User Connected✅");

            socket.on('joinRoom', (orderId) => {
                socket.join(orderId);
                console.log(`User joined room: ${orderId}`); 
            })

            socket.on('disconnect', () => {
                console.log("A User Disconnected❌");
            })   
        })
    })
}

start();