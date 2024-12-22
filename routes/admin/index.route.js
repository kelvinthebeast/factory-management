const systemConfig = require("../../config/system");

const authMiddleware = require("../../middlewares/admin/auth.middleware")
const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const productCategoryRoutes = require("./product-category.route");
const roleRoutes = require("./role.route");
const accountRoutes = require("./account.route");
const authRoutes = require("./auth.route");
const myAccountRoutes = require("./my-account.route");
const settingsRoutes = require("./setting.route");


module.exports = (app) => {
    // app.use("/", homeRoutes);
    // app.get("/", homeRoutes);

    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use("/admin/dashboard",authMiddleware.requireAuth, dashboardRoutes);
    // app.use(PATH_ADMIN + `/products`,productRoutes);
    app.use(PATH_ADMIN + `/products`,authMiddleware.requireAuth, productRoutes);
    
    app.use(PATH_ADMIN + `/products-category`,authMiddleware.requireAuth, productCategoryRoutes);
    app.use(PATH_ADMIN + `/roles`,authMiddleware.requireAuth ,roleRoutes);
    app.use(PATH_ADMIN + `/accounts`,authMiddleware.requireAuth ,accountRoutes);

    app.use(PATH_ADMIN + `/auth`, authRoutes)

    app.use(PATH_ADMIN + `/my-account`,authMiddleware.requireAuth ,myAccountRoutes)

    app.use(PATH_ADMIN + `/settings`,authMiddleware.requireAuth, settingsRoutes)
    



   
}