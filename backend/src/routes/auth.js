import fastify from "fastify";
import {
    fetchUser,
    loginCustomer,
    loginDelievryPartner,
    refreshToken,
} from "../controllers/auth/auth.js";
import {updateUser} from "../controllers/tracking/user.js";
import {verifyToken} from "../middleware/auth.js";

export const authRoutes = async(fastify, options) => {
    fastify.post("/customer/login", loginCustomer);
    fastify.post("/delivery/login", loginDelievryPartner);
    fastify.post("/refresh-token", refreshToken);
    fastify.get("/user", { preHandler: [verifyToken] }, fetchUser);
    fastify.put("/user/update-location", { preHandler: [verifyToken] }, updateUser);
}