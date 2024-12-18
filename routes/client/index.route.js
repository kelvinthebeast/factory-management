const categoryMiddleware = require("../../middlewares/client/category.middleware")
const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const searchRoutes = require("./search.route");

const cartMiddleware = require("../../middlewares/client/cart.middleware");
const cartRoutes = require("../../routes/client/cart.route");
const checkoutRoutes = require("../../routes/client/checkout.route");
const userRoutes = require("../../routes/client/user.route");


module.exports = (app) => {
    // app.use("/", homeRoutes);
    // luôn luôn có middleware này
    app.use(categoryMiddleware.category);

    app.use(cartMiddleware.cartId);
    app.use("/",homeRoutes);
    app.use("/products",productRoutes);

    app.use("/search", searchRoutes);
    
    app.use("/cart", cartRoutes);

    app.use("/checkout", checkoutRoutes);

    app.use("/user", userRoutes);
 


   
}