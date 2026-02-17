import {authRoutes} from "./auth.js";
import {categoryRoutes, productRoutes} from "./products.js";
import {orderRoutes} from "./order.js";

const prefix = "/api";

export const registerRoutes = async (fastify) => {
    await fastify.register(authRoutes, { prefix: prefix });
    await fastify.register(categoryRoutes, { prefix: prefix });
    await fastify.register(productRoutes, { prefix: prefix });
    await fastify.register(orderRoutes, { prefix: prefix });
}