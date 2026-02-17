import {getAllCategories} from "../controllers/product/category.js";
import {getProductsBycategoryId} from "../controllers/product/product.js";

export const categoryRoutes = async (fastify, options) => {
    fastify.get("/categories", getAllCategories);
}

export const productRoutes = async (fastify, options) => {
    fastify.get("/products/:categoryId", getProductsBycategoryId);
}